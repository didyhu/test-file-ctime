const path = require('path')
const fs = require('fs')

const file = path.join(__dirname, "./foo.txt")

function next() {
    const ws = fs.createWriteStream(file, { flags: "a" })
    ws.close()
    ws.once("close", () => {
        const stat = fs.statSync(file)
        console.log("ctime", stat.ctime)
        fs.unlinkSync(file)
        setTimeout(next, 100)
    })
}

next()