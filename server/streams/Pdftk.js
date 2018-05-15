module.exports = class CombinePdfStream extends Readable {
    constructor(id) {
        super({ objectMode: true })
        this.connect(id)
    }

    _read() {
        tmp.file((err, filePath, fd, cleanupCallback) => {
            if (err) throw err;

            const child = spawn('pdftk', [`${path.resolve(__dirname, './temp/')}/*.pdf`, 'cat', 'output', filePath])

            child.on('close', (code) => {
                fs.readFile(filePath, (err, buffer) => {
                    if (err) return;

                    this.push(buffer)
                })
            });


        });
    }


}