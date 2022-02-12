var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    createUser(data: CreateUserDto!): User!
  }

  input CreateUserDto {
    name: String!
    email: String!
    password: String!
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  getUsers: () => {
    const Schema = require('./user_pb');
    const user = new Schema.User();
    user.setId(1);
    user.setName('Utilizador A');
    user.setEmail('utilizador_a@gmail.com');
    user.setPassword('AaAaAa');
    return [user.toObject()];
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');