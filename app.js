const express = require ('express'); //import express
const bodyParser = require('body-parser'); // imports body parser
const { graphql } = require('graphql');
// We have to do a Parsing oopetraiton and also schema
const graphqlHttp = request('express-graphql');
// add schema thorugh special notation
const {buildSchema } = require('graphql');
const app = express(); // builidng app object

app.use(bodyParser.json()); // use bodyparser middleware which parses incoming bodies

// Create Routing for Graphql
app.use('/graphql', graphqlHttp({
    schema: buildSchema(` 
        type RootQuery{
            events: [String!]!

        }

        type RootMutation {
            createEvent(name: String): String

        }
        scehma {
            query: RootQuery 
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['weeeeeee', 'no']
        },
        createEvent: (args) => {
           const eventName =args.name;
           return eventName; 
        }
    },
    graphiql: true
}));
// We create Hello World to Screen 
app.get('/', (req,res, next) =>{

    res.send('Hello World!');
});

app.listen(3000); // listening on port 3000 which we 

