const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeArquivo, callback) => {
    const tiposValidos = ['jpg', 'png', 'jpeg'];
    const tipo = path.extname(caminho);
    const isTipoValido = tiposValidos.indexOf(tipo.substring(1)) !== -1;

    if(!isTipoValido){
        const erro = 'Tipo Inválido';
        callback(erro);
    } else {
        const caminhoEscrita =  `./assets/imagens/${nomeArquivo + tipo}`;
    
        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(caminhoEscrita))
        .on('finish', () =>{
            callback(false, caminhoEscrita);
        });
    }
};




