
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,

} from "@/components/ui/alert-dialog"
import { Dispatch, SetStateAction } from "react";
import { useMutationState } from '@/app/hooks/useMutationState';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';

type Props = {
  conversationId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const RemoveFriendDialog = ({
  conversationId,
  open,
  setOpen
}: Props) => {
  const {mutate: removeFriend, pending} = useMutationState(api.friend.remove)
 
  const handleRemoveFriend = () => {
   
    removeFriend({
      conversationId
    }).then(() => {
      
      toast.success('Friend removed')
    }).catch((e) => {
      toast.error(
        e instanceof ConvexError 
          ? e.data
          : 'Unexpected error occurred'
      ) 
    })
    setOpen(false)
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All messages will be deleted and you
            will not be able to message this user. All group chats will still
            work as normal
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={handleRemoveFriend}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveFriendDialog
