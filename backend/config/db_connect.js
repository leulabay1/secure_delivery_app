const mongoose = require('mongoose')
require('dotenv').config({ path: './config.env' })
const url = "mongodb+srv://leul1:1nE5YenZ4d3CEzoa@cluster0.hslqx7t.mongodb.net/food?retryWrites=true&w=majority";
console.log(url);
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

module.exports = mongoose.connection;