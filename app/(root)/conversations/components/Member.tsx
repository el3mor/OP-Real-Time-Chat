"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'





const Member = ({
  id,
  username,
  imgurl,
  lastMessageSender,
  lastMessageContent
} : {
  id: string,
  username: string,
  imgurl: string,
  lastMessageSender?: string,
  lastMessageContent?: string

}) => {
  const pathname = usePathname()
  const isActive = pathname === `/conversations/${id}`
  
  
  return (
    <Link href={`/conversations/${id}`} className={`flex items-center p-2 rounded-md ring-1 ring-inset
     ring-gray-100 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>
      <img src={imgurl} alt={username} className='h-10 w-10 rounded-full'/>
      <div className='ml-3'>
        <h1 className='text-lg font-semibold'>{username}</h1>
        <p className='text-black dark:text-white font-extrabold'>
          {lastMessageSender ? `${lastMessageSender}:` : 'Start Conversation'} <span className='font-normal text-black/70 dark:text-white/70'>{lastMessageContent
          ? lastMessageContent.length > 30 ? `${lastMessageContent.slice(0, 30)}...` : lastMessageContent : ''}</span>
        </p>
      </div>
    </Link>
  )
}

export default Member
