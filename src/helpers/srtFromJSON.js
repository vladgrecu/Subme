
// Simple padStart function wrapper
const pl = (number, length = 2) => {
    return String(number).padStart(length, '0')
}


const formatTime = (ms) => {
    let time = ms
    const hours = parseInt(Math.floor(time / 3600000))
    time -= hours * 3600000
    const minutes = parseInt(Math.floor(time / 60000))
    time -= minutes * 60000
    const seconds = parseInt(Math.floor(time / 1000))
    time -= seconds * 1000
    return `${pl(hours)}:${pl(minutes)}:${pl(seconds)},${pl(time, 3)}`
}

class Word {
    constructor(word, times) {
        this.word = word
        this.wordLen = this.word.length
        this.start = parseInt(parseFloat(times[0]) * 1000)
        this.finish = parseInt(parseFloat(times[1]) * 1000)
        this.duration = this.finish - this.start
    }

    isEndSentence() {
        const characters = ['.', '?', '!']
        if (this.wordLen) {
            const lastChar = this.word.substr(this.wordLen - 1)
            for (let i = 0; i < characters.length; i++) {
                if (characters[i] === lastChar)
                    return true
            }
        }
        return false
    }
}

class Screen {
    constructor(options = null) {
        this.lines = []
        this.lines[0]  = new Line(options)
        this.lines[1] = new Line(options)
        this.linesCount = 0
        this.start = -1
        this.finish = -1
    }

    canAddWord(word) {
        if (this.linesCount === 2)
            return false
        const result = this.lines[this.linesCount].canAddWord(word)
        if (!result) {
            if (this.linesCount === 1) 
                return false
        }
        return true
    }

    addWord(word) {
        if (this.linesCount > 1)
            return false
        let result = this.lines[this.linesCount].canAddWord(word)
        if (!result) {
            this.linesCount++
            if (this.linesCount < 2)
                result = this.lines[this.linesCount].canAddWord(word)
        } 
        if (result) {
            this.lines[this.linesCount].addWord(word)
            if (this.start === -1)
                this.start = word.start
            this.finish = word.finish
            this.duration = this.lines[0].duration + this.lines[1].duration
            if (word.isEndSentence())
                this.linesCount++
        }
    }

    isFull() {
        return this.linesCount === 2 ? true : false;
    }

    isEmpty() {
        return this.linesCount === 0 && this.lines[0].wordsCount === 0
    }
}

class Line {
    constructor(options = null) {
        this.words = []
        this.wordsCount = 0
        this.charsCount = 0
        this.start = 0
        this.finish = 0
        this.duration = 0
        this.maxCPL = 37
        this.screen = 0
        if (options)
            this.maxCPL = options.maxCharactersPerLine
    }

    canAddWord(word) {
        let total = this.charsCount
        if (this.charsCount > 0)
            total += 1
        total = total + word.wordLen
        return total > this.maxCPL ? false : true
    }

    addWord(word) {
        if (this.wordsCount >= 0)
            this.charsCount++
        this.wordsCount++
        this.words[this.wordsCount] = word
        this.charsCount += word.wordLen
        this.duration += word.duration
        if (this.wordsCount === 1)
            this.start = word.start
        this.finish = word.finish
    }

    getText() {
        if (this.wordsCount == -1)
            return '' 
        let text = ''
        for (let i = 1; i <= this.wordsCount; i++) {
            let word = this.words[i]
            text = `${text}${text == '' ? '' : ' '}${word.word}`
        }
        return text
        
    }
}

const getSubtitle = (data) => {

    const options = {
        minDisplayDuration: 2000,
        maxDisplayDuration: 4000,
        blankDisplayDuration: 50,
        maxCharactersPerLine: 37,
        subtitleWPM: 180
    }
    
    let speed = options.subtitleWPM / 60000 // 160 WPM : ~ 0.0026 word per ms = ~ 384ms per word
        speed = 1 / speed // converted to ms per word. final length rounded to 250ms increments in the code 
    
    const words = []
    let wordsCount = -1
    
    
    data.forEach(object => {
        word = Object.keys(object)[0]
        const timeString = object[word]
        wordsCount++
        const wordObject = new Word(word, timeString.split(':'))
        words[wordsCount] = wordObject
    })
    
    const screens = []
    let screenCount = 0
    
    screenCount++
    screens[screenCount] = new Screen(options)
    screens[screenCount].addWord(words[0])

    const newScreen = () => {
        screenCount++
        screens[screenCount] = new Screen(options)
    }
    
    for (let i = 1; i <= wordsCount; i++) {
        let word = words[i]
        if (screens[screenCount].isFull())
            newScreen()
        if (word.start > words[i - 1].finish + 1000 && !screens[screenCount].isEmpty())
            newScreen()
        if (!screens[screenCount].canAddWord(word))
            newScreen()
        screens[screenCount].addWord(word)
    }
    // console.log(screens[2].lines[1])
    
    let ts = screens[1].start
    let td = 0
    
    let srtText = ''
    
    for (let i = 1; i <= screenCount; i++) {
        let screen = screens[i]
        if (screen.start > ts)
            ts = screen.start
        let totalWords = screen.lines[0].wordsCount + screen.lines[1].wordsCount
        td = parseInt(Math.floor(totalWords * speed))
        td = Math.floor(td / 250) * 250
        if (td < options.minDisplayDuration)
            td = options.minDisplayDuration
        if (td > options.maxDisplayDuration) 
            td = options.maxDisplayDuration
    
        srtText += `${i}\n${formatTime(ts)} --> ${formatTime(ts + td)}\n`
        srtText += `${screen.lines[0].getText()}\n${screen.lines[1].getText()}\n\n`
        ts += td + options.blankDisplayDuration
    }
    
    return srtText
    
}

module.exports = getSubtitle