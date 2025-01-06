
"use client"
import {useEffect, useState} from 'react'
import { usePathname } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import Header from './components/Header'
import Body from './components/body/Body'
import Input from './components/input/Input'
import RemoveFriendDialog from './components/RemoveFriendDialog'
const Page = ({params} : {
  params: {
    conversationID:Id<"conversations">;
  }
}) => {
  const conversationId = params.conversationID
  const pathname = usePathname()
  const [removeFriendDialog, setRemoveFriendDialog] = useState(false)
  const [callType, setCallType] =useState<"audio" | "video" | null>(null);
  useEffect(() => {
    if (pathname === `/conversations/${conversationId}`) {
      document.querySelector('.page')?.classList.remove('max-md:hidden')
      document.querySelector('.page')?.classList.add('max-md:block')
      document.querySelector(".main-page")?.classList.add('max-md:hidden')
    } 
  }, [pathname])
  const conversation = useQuery(api.conversation.get, {id: conversationId})
  
  return (
    <div className='h-[calc(100svh-100px)] p-4 rounded-md flex flex-col ring-1 ring-inset ring-gray-200 dark:ring-gray-700 shadow-lg'>
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFriendDialog}
        setOpen={setRemoveFriendDialog}
      />
      <Header 
        imageUrl={conversation?.otherMember?.imageUrl || ""}
        name={conversation?.otherMember?.username || ""}
        options={[
          {
            label: "Remove friend",
            destructive: true,
            onClick: () => setRemoveFriendDialog(true),
          },
        ]}
        setCallType={setCallType}
      />
      <Body conversationId={conversationId} callType={callType}
        setCallType={setCallType}/>
      <Input conversationId={conversationId}/>
    </div>
  )
}

export default Page
