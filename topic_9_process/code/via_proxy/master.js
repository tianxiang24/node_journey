const net = require('net')
const cp = require('child_process')
// const child1 = cp.fork('./child.js')
// const child2 = cp.fork()

const server = net.createServer((c) => {
    const child1 = new net.Socket()
    child1.connect(8888)
    child1.on('connnection', () => {
        child1.pipe(c)
        c.pipe(child1)
        child1.on('data', data => socket.write(data))
    })
    c.on('data', data => {
        child1.write(data)
    })
})

server.listen(1337, function() {
    console.log(arguments)
})
