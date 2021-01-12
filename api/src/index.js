const express = require("express");
const app = express();
const morgan = require("morgan");

// settings
app.set('port', 3001);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use(require('../routes/index'))

// start the server
app.listen(app.get('port'), () => {
    console.log(`server listen on port ${app.get('port')}`)
})
