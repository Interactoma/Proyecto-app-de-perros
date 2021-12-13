const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4 
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false
    },

    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span: {
      type: DataTypes.STRING
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: 'https://www.hola.com/imagenes/estar-bien/20190820147813/razas-perros-pequenos-parecen-grandes/0-711-550/razas-perro-pequenos-grandes-a.jpg?filter=w500'
    }//MULTER
    
  }, { timestamps: false });
};
