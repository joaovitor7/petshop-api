const conexao = require ('./conexao')

const executarQuery = (query, paramentros = '') => {
    return new Promise( (resolve, reject) => {
        conexao.query(query, paramentros, (erro, resultados) =>{
            if(erro) {
                reject(erro);
            } else {
                resolve(resultados);
            }
        });

    })
}

module.exports = executarQuery
