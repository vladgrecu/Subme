const path = require('path')
const express = require('express')
const router = express.Router()
const availableTranscribeLangs = JSON.parse(require('../static/transcribe-languages.json'))
const availableTranslateLangs = JSON.parse(require('../static/translate-languages.json'))
const subsPath = `${path.join(__dirname, '../')}/subs`
const Audio = require('../models/audio')

router.get('/download/:id', async (req, res) => {
    try {
        _id = req.params.id
        audio = await Audio.findOne({ _id })
        if (!audio)
            throw new Error()
        const file = `${subsPath}/${_id}.srt`
        res.download(file, `${audio.fileName}.srt`)
    } catch (e) {
        res.status(404).send({
            error: 'No such file'
        })
    }
    
})

router.get('/languages', (req, res) => {
    res.send({
        availableTranscribeLangs,
        availableTranslateLangs
    })
})

module.exports = router
