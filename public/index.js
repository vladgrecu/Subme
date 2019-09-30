const submit = document.querySelector('#_submit')
const file = document.querySelector('#_file') 
const progress = document.querySelector('#_progress')
const container = document.querySelector('.container')
const addHeader = () => {
    const h3 = document.createElement('h3')
    h3.innerText = 'Subtitling process started. It might take a while...'
    container.appendChild(h3)
}

const upload = () => {

    if (file.files.length === 0)
        return
    
    const data = new FormData()
    data.append('fromlang', 'en-US')
    data.append('tolang', 'en')
    data.append('upload', file.files[0])

    const request = new XMLHttpRequest()
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            const data = JSON.parse(request.response)
            console.log(data)
            addHeader()
            const queryStatus = setInterval(async () => {
                const response = await fetch(`/status/${data.success}`)
                const json = await response.json()
                if (json.done) {
                    window.location = `/download/${data.success}`
                    clearInterval(queryStatus)
                }
            }, 1000)
            // window.location = `/download/${data.success}`
        }
    }

    request.upload.addEventListener('progress', (e) => {
        progress.style.width = `${parseInt(e.loaded / e.total * 100)}%`
    }, false)

    request.open('POST', '/upload')
    request.send(data)
}

submit.addEventListener('click', upload)