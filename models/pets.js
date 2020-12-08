const conexao = require('../infraestrutura/conexao');
const upload = require('../arquivos/upload');

class Pet{
    adiciona(pet, res) {

        const sql = `INSERT INTO Pets SET ?`;

        upload(pet.imagem, pet.nome, ( erro, caminhoEscrita) => {

            if(erro){
                res.status(400);
                res.json({erro});
            } else {
                const novoPet = {nome: pet.nome, imagem : caminhoEscrita }
            
                conexao.query(sql, pet, (erro, resultados) => {
                    if(erro) {
                        res.status(400);
                        res.json(erro);
                    } else {
                        res.status(201);
                        res.json({ ...novoPet, id : resultados.insertId});
                    }
                })
            }
            
        });
        
       

    }
}

module.exports = new Pet;