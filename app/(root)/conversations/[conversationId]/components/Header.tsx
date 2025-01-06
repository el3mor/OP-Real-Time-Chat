import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, Phone, Settings, Video } from 'lucide-react';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  imageUrl: string;
  name: string;
  options: {
    label: string;
    destructive?: boolean;
    onClick: () => void;
  }[];
  setCallType: Dispatch<SetStateAction<"audio" | "video" | null>>;
}

const Header = ({
  imageUrl,
  name,
  options,
  setCallType
}: Props) => {
  return (
    <div className='w-full flex items-center gap-5 justify-between'>
      <div className='flex items-center max-md:gap-4'>
        <Link href="/conversations" className='md:hidden'>
          <ArrowLeftIcon className='w-6 h-6' />
        </Link>
        <div className='flex items-center gap-4'>
          <img alt='Profile Image' src={imageUrl} width={40} height={40} className='rounded-full' />
          <p className='text-lg font-semibold'>{name}</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button onClick={() => {
          setCallType('audio')
        }} size="icon" variant="secondary"><Phone className='w-6 h-6' /></Button>
        <Button size="icon" onClick={() => {
          setCallType('video')
        }}  variant="secondary"><Video className='w-6 h-6' /></Button>
        {options ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="secondary">
                <Settings/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option, id) => {
                return (
                  <DropdownMenuItem
                    key={id}
                    onClick={option.onClick}
                    className={`
                      text-destructive:${option.destructive}`}
                  >
                    {option.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
        
      </div>
    </div>
  )
}

export default Header
