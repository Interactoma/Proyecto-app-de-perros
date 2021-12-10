const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temperament', {

/*         id: {
            type: DataTypes.INTEGER
        }, */
        name: {
            type: DataTypes.STRING
        }

    })
}