import { GraphQLBoolean, GraphQLID, GraphQLString, GraphQLObjectType } from 'graphql';
import { Users } from '../../models/Users';
import bcrypt from 'bcrypt';
import { MessageType } from '../typeDefs/Message.type';

export const UPDATE_USER = {
  type: MessageType,

  args: {
    id: { type: GraphQLID },
    body: {
      type: new GraphQLObjectType({
        name: 'UserData',
        fields: {
          name: { type: GraphQLString },
          username: { type: GraphQLString },
          newPassword: { type: GraphQLString },
          oldpassword: { type: GraphQLString },
        }
      })
    }
  },

  async resolve(_: any, input: any) {
    
    const {id, name, username, newPassword, oldpassword} = input

    const userToUpdate = await Users.findOne(id);
    const isMatch = await bcrypt.compare(oldpassword, userToUpdate.password);
    
    if(!isMatch) return {
      success: false,
      message: 'Old password is incorrect'
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    const response = await Users.update({ id }, {
      username, 
      name, 
      password: newPasswordHash
    });

    return {
      success: true,
      message: 'User updated successfully'
    }
  }
} 