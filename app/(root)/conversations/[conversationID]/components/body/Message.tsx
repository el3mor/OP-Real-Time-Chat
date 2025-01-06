import React from 'react'

type Props = {
  message: string
  isCurrentUser: boolean
  msgType:string
}

const Message = ({
  message,
  isCurrentUser,
  msgType
}: Props) => {
  return (
    <div className={`w-full flex ${isCurrentUser ? 'justify-start' : 'justify-end'}`}>
    <div
    className = {`py-2 px-4 rounded-md font-extrabold break-words overflow-hidden text-lg ${isCurrentUser ? 'bg-sky-400 text-white dark:bg-gray-700 ' : 'bg-gray-100 dark:bg-gray-800'} max-w-[50%] overflow-auto  w-fit`}
    >{msgType === "text" ? (message) : "Call..."}</div></div>
  )
}

export default Message
