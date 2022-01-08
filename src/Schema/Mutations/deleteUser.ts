import { GraphQLID, GraphQLString } from 'graphql';
import { Users } from '../../models/Users';
export const DELETE_USER = {
  type: GraphQLString,
  args: {
    id: { type: GraphQLID }
  },
  async resolve(_: any, args: any) {
    const {affected} = await Users.delete(args.id);
    return(
      affected && affected > 0?  `User with id: ${args.id} deleted successfully`: `User with id: ${args.id} not found`)
  }
}