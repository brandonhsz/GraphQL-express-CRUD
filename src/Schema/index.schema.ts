import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { GREETING } from "./Queries/Greeting";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    greeting: GREETING
  }
})

export const schema = new GraphQLSchema({
  query: RootQuery,
})