const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Pessoa = sequelize.define('Pessoa',
        {
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            telefone: DataTypes.STRING
        },
        { tableName: 'pessoa'}
        
    )
    return Pessoa
}