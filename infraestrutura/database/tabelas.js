const { text } = require("body-parser");

class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos() {
        const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (
                        id int NOT NULL AUTO_INCREMENT, 
                        client varchar(11) NOT NULL, 
                        pet varchar(20), 
                        servico varchar(20) NOT NULL,
                        data datetime NOT NULL,
                        dataCriacao datetime NOT NUll, 
                        status varchar(50) NOT NULL,
                        observacoes text,
                        PRIMARY KEY(id))`;

        this.conexao.query(sql , erro =>{
            if(erro){
                console.log('erro ao criar a Table de atendimentos');
            } else {
                console.log('tabela atendimentos criada com sucesso');
            }
        })
    }

    criarPets(){

        const sql = `CREATE TABLE IF NOT EXISTS Pets (
            id int NOT NULL AUTO_INCREMENT, 
            nome varchar(50) NOT NULL, 
            imagem varchar(200), 
            PRIMARY KEY(id))`;

        this.conexao.query(sql , erro =>{
        if(erro){
            console.log('erro ao criar a Table de pets');
        } else {
            console.log('tabela de pets criada com sucesso');
        }
        })
    }

    
}

module.exports = new Tabelas;