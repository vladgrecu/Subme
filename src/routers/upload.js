const express = require('express')
const Audio = require('../models/audio')
const multiparty = require('multiparty');
const path = require('path')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
const uploadToGCS = require('../helpers/uploadToGoogle')
const removeFileFromGCS = require('../helpers/removeFileFromGCS')
const availableTranscribeLangs = JSON.parse(require('../static/transcribe-languages.json'))
const availableTranslateLangs = JSON.parse(require('../static/translate-languages.json'))
const ObjectID = require('mongodb').ObjectID
const transcribe = require('../helpers/transcribe')
const router = new express.Router()
ffmpeg.setFfmpegPath(ffmpegPath)


router.post('/upload', (req, res) => {
    const form = new multiparty.Form({
        maxFields: 3
    })
    
    let audio
    let toLang
    let fromLang
    let errorMessage
    
    form.on('field', (field, value) => {
        if (field === 'tolang' && Object.values(availableTranslateLangs).includes(value))
            toLang = value

        else if (field === 'fromlang' && Object.values(availableTranscribeLangs).includes(value))
            fromLang = value
    })
    
    form.on('part', (part) => {
        // Ignore parts that aren't files
        if (!part.filename)
            return
        
        // If those fields don't exist trigger a form error
        if (!toLang || !fromLang) {
            errorMessage = 'Invalid request'
            form.emit('error', { message: errorMessage })
        }
            
        // Generate a new ObjectID manually for the audio
        id = new ObjectID()
        const fileName = path.parse(part.filename).name
        audio = new Audio({
            _id: id,
            toLang,
            fromLang,
            fileName
        })

        // Pass part, which is a readable stream as an argument
        ffmpeg(part)
            .inputOptions('-ac 1')
            .outputFormat('mp3')
            .on('end', async (e, stdout) => {
                // This only happens if the uploaded video is not streamable
                if (stdout.includes('Invalid data found when processing input')) {
                    errorMessage = 'This type of mp4 is not supported'
                    form.emit('error', {'message': errorMessage})
                }
                // If this event occurs after the senders have been sent, remove the file.
                // It means that an error event has been emitted on the form.
                if (!res.headersSent) {
                    await audio.save()
                    res.status(201).send({
                        success: audio._id
                    })
                    return transcribe(id, fromLang, toLang)
                }
                removeFileFromGCS(id)
                
            }).on('error', (e) => {
                console.log(e)
                errorMessage = 'Invalid file'
                form.emit('error', { message: errorMessage })
                removeFileFromGCS(id)
            }).writeToStream(uploadToGCS(id), { end: true })
        
    })

    form.on('error', async (e) => {
        if (e.message.includes('maxFields'))
            errorMessage = 'Too many form fields.'
        if (!res.headersSent)
            res.status(400).send({
                error: errorMessage
            })
    })

    form.parse(req)
})

module.exports = router