const moment = require('moment');
const atendimentos = require('../controllers/atendimentos');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const isDataValida = moment(data).isSameOrAfter(dataCriacao);
        const isClientValido = atendimento.client.length >= 4;

        const validacoes = [
            {
                nome: "data",
                isValido: isDataValida,
                msg: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: "client",
                isValido: isClientValido,
                msg: 'Nome deve ter 4 ou mais caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.isValido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400);
            res.json(erros);
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};
        
            const sql = `INSERT INTO Atendimentos SET ?`;

            conexao.query(sql, atendimentoDatado, (erro, resultados) =>{
                if(erro) {
                    res.status(400);
                    res.json(erro);
                } else {
                    res.status(201);
                    res.json({ ...atendimento, id : resultados.insertId});
                }
            });
        
        }
    }

    lista(res){
        const sql ='SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultados) =>{
            if (erro){
                res.status(400);
                res.json(erro);
            } else {
                res.status(200);
                res.json(resultados);
            }
        })
    }

    buscarPorId(id, res){
        const sql =`SELECT * FROM Atendimentos
                    WHERE Atendimentos.id = ?`;
        
        conexao.query(sql, id, (erro, resultados) => {
            if (erro){
                res.status(400);
                res.json(erro);
            } else {
                res.status(200);
                res.json(resultados[0]);
            }
        });

    }

    altera(id, valores, res){
        if (valores.data){
            valores.data =  moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = `UPDATE Atendimentos SET ? WHERE id=?`;

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro){
                res.status(400);
                res.json(erro);
            } else {
                res.status(200);
                res.json({...valores, id});
            }
        });
    }

    deleta(id, res){
        const sql =`DELETE FROM Atendimentos
                    WHERE Atendimentos.id = ?`;
        
        conexao.query(sql, id, (erro, resultados) => {
            if (erro){
                res.status(400);
                res.json(erro);
            } else {
                res.status(200);
                res.json({id});
            }
        });

    }

}

module.exports = new Atendimento;