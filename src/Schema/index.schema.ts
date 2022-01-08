import { GraphQLSchema, GraphQLObjectType } from "graphql";

import { GET_ALL_USERS } from "./Queries/getUsers";
import { GET_USER } from "./Queries/getUser";

import { CREATE_USER } from "./Mutations/createUser";
import { DELETE_USER } from "./Mutations/deleteUser";
import { UPDATE_USER } from "./Mutations/updateUser";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getUser: GET_USER,
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updateUser: UPDATE_USER,
  }
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})