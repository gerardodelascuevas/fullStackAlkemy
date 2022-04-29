const { DataTypes } = require('sequelize')

module.exports = sequelize=> {
    sequelize.define('Movement', {
        id: {         
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,  
            defaultValue: DataTypes.UUIDV4,          
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        concept: {
            type: DataTypes.STRING,
            //allowNull: false,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}