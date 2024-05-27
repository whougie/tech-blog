const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt= require('bcrypt');

class User extends Model {}

User.init(
  {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [3]
          }
      }
  },
  {
      hooks: {
        beforeCreate: async(userData) => {
          userData.password = await bcrypt.hash(userData.password, 10);
          return userData;
        },
        beforeUpdate: async(userData) => {
          if( userData.password ){
            userData.password = await bcrypt.hash(userData.password, 10);
            return userData;
          }
        },
      },
      sequelize,
      underscored: true,
      freezeTableName: true,
      modelName: 'user'
  },


);

module.exports = User;