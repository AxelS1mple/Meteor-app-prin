import { useToast } from '@chakra-ui/react';
import { Meteor } from 'meteor/meteor';

export function useUserItem() {
  const toast = useToast();

  async function onMarkAsDone(_id) {
    await Meteor.callAsync('toggleUserDone', { userId: _id });
  }

  async function onDelete(_id) {
    try {
      await Meteor.callAsync('removeUser', { userId: _id });
      toast({
        title: 'User removed.',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Ocurrio un error.',
        description: error.message,
        status: 'error',
      });
    }
  }

  async function onUpdating(_id, name) {
    console.log('Updating User:', { _id, name });
    try{
      await Meteor.callAsync('updatingUser', { userId:_id, name });
      toast({
        title: 'User updating.',
        status: 'success',
      });
    }catch(error){
      toast({
        title: 'Ocurrio un error.',
        description: error.message,
        status: 'error',
      });
    }
  }

  return {
    onUpdating,
    onMarkAsDone,
    onDelete,
  };
}