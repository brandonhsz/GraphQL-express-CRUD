import { GraphQLList } from 'graphql';
import { Users } from '../../models/Users';
import { UserType } from '../typeDefs/User.type';

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),

  async resolve(){

    return await Users.find();

  }
}