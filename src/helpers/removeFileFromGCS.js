const {Storage} = require('@google-cloud/storage')
const storage = new Storage()
const bucketName = 'gs://just-episode-149914.appspot.com'
const removeFileFromGCS = (id) => {
    setTimeout(async () => {
        await storage
        .bucket(bucketName)
        .file(`${id}.mp3`)
        .delete()
    }, 5000)
}

module.exports = removeFileFromGCS

