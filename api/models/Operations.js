const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const validations = {
        allowNull: false,
        strType: {
            isString(value) {
                if (typeof value !== "string")
                    throw new Error("Error: Must be a string");
            },
        },
        intType: {
            isNumeric: true,
        },
    };
    sequelize.define('Operation', {
        concept: {
            type: DataTypes.STRING,
            allowNull: validations.allowNull,
            validate: validations.strType,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: validations.allowNull,
            validate: validations.intType,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: validations.allowNull,
            validate: validations.strType,
        },
    })
}