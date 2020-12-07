const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const  Tabelas = require('./infraestrutura/tabelas')

conexao.connect(error =>{
    if(error){
        console.log(error);
    } else {
        console.log('Conectado com sucesso na base de dados');
        
        Tabelas.init(conexao);
        const app = customExpress();

        app.listen(3000, () => {
            console.log('App listening on port 3000!');
        });
    }
})


