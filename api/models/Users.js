const { DataTypes, Sequelize } = require("sequelize");

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
    sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: validations.allowNull,
            validate: validations.strType,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: validations.allowNull,
            validate: validations.intType,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: validations.allowNull,
            validate: validations.strType,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: Sequelize.STRING,
            get() {
                return () => this.getDataValue('password')
            }
        },
        salt: {
            type: DataTypes.STRING,
            get() {
                return () => this.getDataValue('salt')
            }
        },
    });
}
