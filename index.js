const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const ShoesAppSchema = require('./schemas/shoes.schema')

app.use('/', graphqlHTTP({
    schema:ShoesAppSchema,
    graphiql:true
}));

app.listen(3000, (err) =>{
    console.log("Listening to the PORT 3000")
})
