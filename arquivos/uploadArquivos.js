const fs = require('fs')

//sync
fs.readFile('./assets/lulu.jpg', (error, buffer) =>{
    console.log(buffer);

    fs.writeFile('./assets/lulu2.jpg', buffer, (error) =>{
        console.log("Arquivo escrito");
    });
})

//async
fs.createReadStream('./assets/lulu.jpg')
    .pipe(fs.createWriteStream('./assets/luluStreams.jpg'))
    .on('finish', () =>{
        console.log("Arquivo Stream Escrito")
    })



