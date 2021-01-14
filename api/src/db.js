require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const crypto = require('crypto');
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/financeapp`,
    {
        logging: false,
        native: false,
    }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Read all the files from the Models folder, require them and add to the modelDefiners array
fs.readdirSync(path.join(__dirname, "../models"))
    .filter(
        (file) =>
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, "../models", file)));
    });

// Inject sequelize conection to all models
modelDefiners.forEach((model) => model(sequelize));
// Capitalize all the models names ie: operation => Operations
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// make the relations
const {
    Operation,
    User
} = sequelize.models;

User.hasMany(Operation);
Operation.belongsTo(User);

//-------Password------
User.generateSalt = function () {
    return crypto.randomBytes(20).toString("hex");
},
    User.encryptPassword = function (plainText, salt) {
        return crypto
            .createHash('RSA-SHA256')
            .update(plainText)
            .update(salt)
            .digest('hex')
    }
const setSaltAndPassword = usuario => {
    if (usuario.changed('password')) {
        usuario.salt = User.generateSalt()
        usuario.password = User.encryptPassword(usuario.password(), usuario.salt())
    }
}
User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

User.prototype.correctPassword = function (enteredPassword) {
    return User.encryptPassword(enteredPassword, this.salt()) === this.password()
}

module.exports = {
    ...sequelize.models,
    conn: sequelize,
};