import { GraphQLID } from 'graphql';
import { Users } from '../../models/Users';
import { UserType } from '../typeDefs/User.type';
export const GET_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID }
  },
  async resolve(_: any, args: any) {
    
    return await Users.findOne(args.id);

  }
}