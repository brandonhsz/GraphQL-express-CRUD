import { GraphQLString, GraphQLObjectType } from 'graphql';
import { Users } from '../../models/Users'
import { UserType } from '../typeDefs/User.type';
import bcrypt from 'bcrypt'

export const CREATE_USER = {
  type: UserType,

  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  },

  async resolve(_: any , args: any){

    const { name, username, password } = args

    const encryptPassword =  await bcrypt.hash(password, 10)

    const result = await Users.insert({
      name: name,
      username: username,
      password: encryptPassword
    })
    const newUser = await Users.findOne(result.identifiers[0].id)
    console.log( newUser )
    return newUser
  }
}