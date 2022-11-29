const {SerialPort, ByteLengthParser} = require('serialport')
const crypto = require('crypto');

const algorithm = 'aes-256-cbc'
const key = "================================================================================================================================================================================================================================================================";
const iv = "================";


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

//const port = new SerialPort({
//    path: '/dev/serial0',
//    baudRate: 9600
//})
//
//const parser = port.pipe(new ByteLengthParser({length: 8}))
//
//parser.on('data', console.log)


var hw = encrypt("Some serious stuff")
console.log(hw)
console.log(decrypt({
    iv: iv,
    encrytedData: 'Ã’\f9Ã�â”¼Ã„%tyUN#RÆ’CÃ™â•¦9Ã‹!câ”ŒÃ�bÂ¼â•©Â¦]Ã�Â§vÃ€lÂ¡Ã™Ã¬Ã±F)>Tyâ–‘Â¸aÂ¶tÃ–9Ã‡MfM#Â»â–ˆ<â”˜â–‘N/Ã®_EÃ¾Â¡Q}RÃ…â–ˆwâ•—vGâ–’X6Â¨>Â¿EÃš;Â¼Ã¤Ã�Wâ•‘ÃžcOYÂ¡â”´E+ÂºÃ€â•‘;QÂºÃŒ+_Ã‹â–“â–„Â¾jFWÃ½Ã²^Ã¼~Ã‡Â¶Ã¥aÃ¡Â³$Ã·â”´&)â–„ÃªÂ±Ã¾L#Ã“Â¾Â½Ã¨Ã›VÃšÃ¤Â¸\fÃµ\t(Ã­{jta8EÃ�Oâ•�Ãž]Ã‰Ã…=Ãµâ”€@ÃŸÃŠÃˆâ–„$Ã´â”¤f]ÂµÃˆHâ•¦Â¬â•£Ã¢Ã�Â¦bÃ©ÃŸhâ”ŒÃ°&â•¦Â¡!Eâ”ŒWÃ¸Â Â¬Ã”â”¬ L=~Ã¦Â³â€—Ã»Â¸Â­+Ã«â•‘UÃ¥Ã„Ãˆx*cDeÃ¼Ã§Ã£&DÂ»/$1c?pâ•£Ã»D!â•—Ã¶â– Ã„W6? Ã“Ã¹IV: 3d 80'
}))