const path = require('path')
const fs = require('fs')
const express = require('express')
const router = express.Router()
const speech = require('@google-cloud/speech')
const Audio = require('../models/audio')
const toSrt = require('./srtFromJSON')
const subsPath = path.join(__dirname, '../subs')
const gcsURI = 'gs://just-episode-149914.appspot.com'
const removeFileFromGCS = require('../helpers/removeFileFromGCS')

transcribe = async (_id, languageCode, toLanguageCode) => {
      setTimeout(async () => {
        const client = new speech.SpeechClient()

        // The name of the audio file to transcribe
          const audioDetails = await Audio.findOne({ _id })
          languageCode = audioDetails.fromLang
          
          // The audio file's encoding, sample rate in hertz, and BCP-47 language code
          const audio = {
            uri: `${gcsURI}/${id}.mp3`,
          }
    
          const config = {
            encoding: 'libmp3lame',
            sampleRateHertz: 16000,
            languageCode,
            enableWordTimeOffsets: true,
            enableAutomaticPunctuation: true
          }
          const request = {
            audio: audio,
            config: config,
          }
    
          const [operation] = await client.longRunningRecognize(request)
      
          // Get a Promise representation of the final result of the job
          const [response] = await operation.promise()
          const data = []
          response.results.forEach(result => {
            result.alternatives[0].words.forEach(wordInfo => {
              // NOTE: If you have a time offset exceeding 2^32 seconds, use the
              // wordInfo.{x}Time.seconds.high to calculate seconds.
              const startSecs =
                `${wordInfo.startTime.seconds}` +
                `.` +
                wordInfo.startTime.nanos / 100000000;
              const endSecs =
                `${wordInfo.endTime.seconds}` +
                `.` +
                wordInfo.endTime.nanos / 100000000
                
                const objectToPush = {}
                objectToPush[wordInfo.word] = `${startSecs}:${endSecs}`
                data.push(objectToPush)
            })
          })
          fs.writeFile(`${subsPath}/${_id}.txt`, JSON.stringify(data), () => {
            console.log('Written JSON')
          })
          fs.writeFile(`${subsPath}/${_id}.srt`, toSrt(data), async () => {
            audioDetails.finished = true
            removeFileFromGCS(_id)
            audioDetails.save()
          })
          
      }, 5000)
     
}

module.exports = transcribe
