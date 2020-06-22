const express = require("express")
const bodyParser = require("body-parser")
const graphqlHttp = require("express-graphql")
const mongoose = require('mongoose')
const cors = require('cors')
const errCode = require("./graphql/_constants/errorStatus.constants")

const schema = require('./graphql/schema/index')
const resolver = require("./graphql/resolver")

const app = express();

const isAuth = require("./middleware/isAuth")

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
console.log(`------`, env);

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV ? process.env.NODE_ENV : "development"}`
});
server_port = process.env.PORT;

app.use(cors())
app.use(bodyParser.json());
app.use(isAuth)

app.use('/graphql',graphqlHttp({
    schema,
    rootValue:resolver,
    graphiql: env==="development" && true, 
    customFormatErrorFn: (err) => {
      return {message:err.message , code: errCode[err.message] ? errCode[err.message] : 500 }
    }
}))
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-hy1sp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(
    app.listen(server_port,()=>console.log("Server Listening =============>"+server_port))
)
.catch (err => console.log(err))
 