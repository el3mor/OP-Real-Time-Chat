import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import Message from './Message'
import CallRoom from './CallRoom'

const Body = ({
  conversationId,
  callType,
  setCallType
}: {
  conversationId: string
  callType: "audio" | "video" | null;
  setCallType: Dispatch<SetStateAction<"audio" | "video" | null>>;
}) => {
  const messages = useQuery(api.messages.get, {id: conversationId as Id<"conversations">})
  console.log(messages)
  return (
    <div className='flex-1 w-full overflow-y-scroll flex flex-col-reverse gap-2 p-2 no-scrollbar mb-3'>
      {!callType ? (
        messages ? (
        messages?.length === 0 ? (
          <div className='text-center text-gray-500 dark:text-gray-400'>No messages yet</div>
        ) : (
          messages.map((message) => {
            return (
              <Message 
                key={message.massage._id}
                message={message.massage.content[0]}
                msgType={message.massage.type}
                isCurrentUser={message.isCurrentUser}
              />
            )
          })
        )) : (
          <Loader2 
            className='h-8 w-8 flex items-center justify-center'/>
        )
      ): (
        <CallRoom
          audio={callType === "audio" || callType === "video"}
          video={callType === "video"}
          handleDisconnect={() => setCallType(null)}
          conversationId={conversationId}
        />
      )}
    </div>
  )
}

export default Body
