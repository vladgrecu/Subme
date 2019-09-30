const express = require('express')
const router = express.Router()
const Audio = require('../models/audio')

router.get('/status/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const audio = await Audio.findOne({ _id })
        if (!audio) {
            return res.status(404).send({
                error: 'No such file'
            })
        }
    
        res.send({done: audio.finished})
    } catch (e) {
        res.status(400).send({
            error: 'Something went wrong'
        })
    }
    
    
})

module.exports = router
