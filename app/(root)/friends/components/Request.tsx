import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { Check,  X } from "lucide-react";
import { useMutationState } from '@/app/hooks/useMutationState';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';


const Request = ({

  id,
  imageUrl,
  username,
  email,
} : {

  id: string,
  imageUrl: string,
  username: string,
  email: string,
}) => {
  const {mutate:denyRequest, pending:denyPending} = useMutationState(api.request.deny)
  const {mutate:acceptRequest, pending:acceptPending} = useMutationState(api.request.accept)
  return (
    <div className='rounded-md flex flex-row p-3 gap-4 justify-between items-center ring-1 ring-inset ring-gray-200 dark:ring-gray-700 '>
      <div className='flex gap-4 items-center'>
      <Image src={imageUrl} width={30} height={30} className='rounded-full' alt={id} />
      <div>
        <h1 className='text-lg font-semibold'>{username}</h1>
        <p className='text-sm text-gray-500'>{email}</p>
      </div>
      </div>
      <div className='flex gap-4'>
        <Button size="icon" disabled={acceptPending} 
        onClick={() => {
          acceptRequest({id}).then(() => {
            toast.success("Friend Request accepted")
          }).catch((e) => {
            toast.error(e instanceof ConvexError ? e.data : "An error occurred")
          })
        }}>
        <Check />
        </Button>
        <Button size="icon" variant="destructive" disabled={denyPending} 
        onClick={() => {
          denyRequest({id}).then(() => {
            toast.success("Friend Request denied")
          }).catch((e) => {
            toast.error(e instanceof ConvexError ? e.data : "An error occurred")
          })
        }}>
        <X />
        </Button>
      </div>
    </div>
  )
}

export default Request
