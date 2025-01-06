"use client"
import { CirclePlus, Loader2 } from 'lucide-react'
import { ReactNode } from 'react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Member from './components/Member'

const Layout = ({children} : {children: ReactNode}) => {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname === `/conversations`) {
      document.querySelector('.main-page')?.classList.remove('max-md:hidden')
      document.querySelector('.main-page')?.classList.add('max-md:block')
      document.querySelector(".page")?.classList.add('max-md:hidden')
    } 
  }, [pathname])
  const converstaions = useQuery(api.converstaions.get)
  console.log(converstaions)
  return (
    <div className=' grid grid-cols-10 gap-5 w-full max-md:h-full '>
      <div className='main-page md:col-span-3 col-span-full rounded-md ring-1 ring-inset ring-gray-200 dark:ring-gray-700 shadow-lg'>
        <div className='p-4 flex justify-between items-center'>
        <h1 className='text-2xl font-extrabold'>Conversations</h1>
        <button className='ring-1 ring-inset ring-gray-200 dark:ring-gray-700 rounded-md p-2'><CirclePlus /></button>
        </div>
        <div className='flex flex-col p-4 gap-4 mt-5'>
        {converstaions ? (
          converstaions.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No conversations found
            </p>
          ) : (
            converstaions.map((conversation) => {
              return conversation.conversation.isGroup ? null : (
                <Member 
                key={conversation.conversation._id}
                id={conversation.conversation._id}
                username={conversation.otherMember?.username || ""}
                imgurl={conversation.otherMember?.imageUrl || ""}
                lastMessageSender={conversation.lastMessage?.sender}
                lastMessageContent={conversation.lastMessage?.content}
                />
              )
            } )
          )
        ) : (
          <Loader2 className="h-8 w-8 flex items-center justify-center" />
        )}
        </div>
      </div>
      <div className='md:col-span-7 col-span-full page'>
        {children}
      </div>
    </div>
  )
  
}

export default Layout
