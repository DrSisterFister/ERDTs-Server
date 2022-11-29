const {SerialPort, ByteLengthParser} = require('serialport')

const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(128);
const iv = crypto.randomBytes(16);


function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')}
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex')
    let encryptedText = Buffer.from(text.encryptedData, 'hex')
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}

const port = new SerialPort({
    path: '/dev/serial0',
    baudRate: 9600
})

const parser = port.pipe(new ByteLengthParser({length: 8}))

parser.on('data', console.log)


var hw = encrypt("Some serious stuff")
console.log(hw)
console.log(decrypt(hw))