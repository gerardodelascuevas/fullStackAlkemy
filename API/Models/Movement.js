const { DataTypes } = require('sequelize')

module.exports = sequelize=> {
    sequelize.define('Movement', {
        id: {
            defaultValue: DataTypes.UUIDV4,
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,            
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        concept: {
            type: DataTypes.STRING,
            allowNull: false,
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