const { SerialPort, ByteLengthParser} =require('serialport');


const port = new SerialPort({
    path: '/dev/serial0',
    baudRate: 9600
})

const parser = port.pipe(new ByteLengthParser({length: 8}))

parser.on('data', console.log)
