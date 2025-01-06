"use client"
import { ReactNode } from 'react'
import AddFriendDialog from './components/AddFriendDialog'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Request from './components/Request'
import { Loader2 } from "lucide-react";

const Layout = ({children} : {children: ReactNode}) => {
 
  const requests = useQuery(api.requests.get)
  

  return (
    <div className='grid grid-cols-10 gap-5 max-md:h-full w-full'>
      <div className='md:col-span-3 col-span-full  rounded-md ring-1 ring-inset ring-gray-200 dark:ring-gray-700 shadow-lg'>
        <div className='p-4 flex justify-between items-center'>
        <h1 className='text-2xl font-extrabold'>Friends</h1>
        <AddFriendDialog />
        
        </div>
        <div className='flex flex-col p-4 gap-4 mt-5'>
        {requests ? (
          requests.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No friend requests found
            </p>
          ) : (
            requests.map((request) => {
              return (
                <Request
                  key={request.request._id}
                  id={request.request._id}
                  imageUrl={request.sender.imageUrl}
                  username={request.sender.username}
                  email={request.sender.email}
                />
              );
            })
          )
        ) : (
          <Loader2 className="h-8 w-8" />
        )}
          
        </div>
      </div>
      <div className='col-span-7 max-md:hidden'>
        {children}
      </div>
    </div>
  )
  
}

export default Layout
