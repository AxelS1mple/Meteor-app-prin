import { useToast } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { Meteor } from "meteor/meteor";
import { useForm } from "react-hook-form";
import * as z from 'zod';

export function useUserForm(){
  const toast = useToast();
  const schema = z.object({
    name: z.string().min(1, 'user name is required'),
  });

  const { handleSubmit, register, reset, formState } = useForm({
    resolver: zodResolver(schema),
  });

  async function saveUser(values) {
    const name = values.name.trim();
    try{
        await Meteor.callAsync('insertUser', { name });
        reset();
    }catch(err){
        const reason = err?.reason || 'surgio un error, porfavor intenta de nuevo';
        toast({
            title: 'Ocurrio un error.',
            name: reason,
            status: 'error'
        });
    }
  }

  return {
    saveUser,
    register,
    formState,
    handleSubmit,
  };
}