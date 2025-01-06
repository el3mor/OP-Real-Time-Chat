"use client"
import { useMutationState } from '@/app/hooks/useMutationState'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { api } from '@/convex/_generated/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { ConvexError } from 'convex/values'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import TextareaAutosize from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { SendHorizonal } from 'lucide-react'

const chatMessageSchema = z.object({
  content: z.string().min(1,{
    message: "Message cannot be empty"
  }),
})
const Input = ({
  conversationId
}: {
  conversationId: string
  
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  
  const {mutate: createMessage, pending} = useMutationState(api.message.create)
 
  const form = useForm<z.infer<typeof chatMessageSchema>>(
    {
      resolver:zodResolver(chatMessageSchema),
      defaultValues: {
        content: "",
      }
    }
  )
  const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      content: [values.content],
      type: "text",
      conversationId,
    })
      .then(() => {
        form.reset();
        textareaRef.current?.focus();
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "Unexpected error occurred"
        );
      });
  };
  const handleInputChange = (e: any) => {
    const {value, selectionStart} = e.target

    if (selectionStart !== null) {
      form.setValue("content", value)
    }
  }
  return (
    <div className='flex flex-col space-y-1.5  w-full p-3 rounded-lg relative ring-inset ring-1 ring-gray-100 dark:ring-gray-800'>
      <div className='flex gap-2 items-end w-full'>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex gap-2 items-end w-full'>
            <FormField control={form.control} name='content' 
            render={({field}) => {
               return <FormItem  className='h-full w-full'>
                <FormControl>
                  <TextareaAutosize 
                    onKeyDown={async e => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        await form.handleSubmit(handleSubmit)()
                      }
                    }}
                    rows={1} maxRows={3} {...field} onChange={handleInputChange} 
                    onClick={handleInputChange}
                    placeholder='Type a message'
                    className='min-h-full w-full resize-auto border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5'
                  />
                </FormControl>
              </FormItem>
            }}/>
            <Button disabled={pending} size="icon" type='submit' >
              <SendHorizonal/>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Input
