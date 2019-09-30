const { Storage } = require('@google-cloud/storage');
const storage = new Storage()

const uploadToGCS = (_id) => {
    
    const bucketName = 'gs://just-episode-149914.appspot.com'
    const bucket = storage.bucket(bucketName)
	
    const gcsFileName = `${_id}.mp3`
	
    const file = bucket.file(gcsFileName)

    const stream = file.createWriteStream()
	
    stream.on('error', (err) => {
        console.log(err)
        console.log('Upload failed')
    })
	
	return stream
  }

  module.exports = uploadToGCS