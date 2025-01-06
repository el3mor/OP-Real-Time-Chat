"use client"
import { UserButton } from '@clerk/nextjs'
import {  Users,MessageSquare } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ToggleTheme from './ToggleTheme'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'





const SideBar = () => {
  const requestsCount = useQuery(api.requests.count)
 
  const pathname = usePathname()

  const links = [
    { href: '/conversations', label: 'conversations', icon: <MessageSquare /> },
    { href: '/friends', label: 'friends', icon: <Users />, count: requestsCount },
  ]
  return (
    <div className='md:h-full md:col-span-1 flex md:justify-between justify-around gap-4 items-center w-full md:flex-col py-4 px-5 md:w-14  rounded-md ring-1 ring-inset ring-gray-200 dark:ring-gray-700 shadow-lg'>
      <div className='flex gap-4 md:flex-col items-center max-md:justify-between'>
        {links.map(({ href, label, icon, count  }) => (
          <Link key={label} href={href} className={`relative rounded-md ring-2 ring-inset ring-gray-200  dark:ring-gray-700 p-2 ${pathname.includes(href) ? "bg-sky-500 ring-sky-500 dark:ring-sky-500 text-white" : ""} `} >
            {icon}
            {count > 0 ? <span className='absolute -top-2 -right-1 w-5 h-5 flex items-center justify-center bg-sky-500 text-white rounded-full p-1 text-xs'>{count}</span> : ""}
          </Link>))}
      </div>
      <div className='flex md:flex-col gap-4 justify-center items-center'>
        <ToggleTheme />
      <UserButton />
      </div>
    </div>
  )
}

export default SideBar
