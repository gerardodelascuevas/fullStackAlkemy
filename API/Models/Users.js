const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = sequelize=> {
    sequelize.define('Users', {
        id: {
            type: DataTypes.UUID, 
            allowNull: false, 
            primaryKey: true, 
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING || DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}
// , {
//     freezeTableName: true,
//     instanceMethods: {
//         generateHash(password) {
//             return bcrypt.hash(password, bcrypt.genSaltSync(10));
//         },
//         validPassword(password) {
//             return bcrypt.compare(password, this.password);
//         }
//     }    
// }