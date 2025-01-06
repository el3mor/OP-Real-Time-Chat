"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { api } from "@/convex/_generated/api";
import { useMutationState } from "@/app/hooks/useMutationState";
import { ConvexError } from "convex/values";
import { toast } from "sonner";



const AddFriendDialogSchema = z.object({
  email: z.string().min(1, 
    {message:'Email is required'}).
    email('please enter a valid email'),
})

const AddFriendDialog = () => {
  const { mutate: createRequest, pending } = useMutationState(
    api.request.create
  );
  const form = useForm<z.infer<typeof AddFriendDialogSchema>>({
    resolver: zodResolver(AddFriendDialogSchema),
    defaultValues: {email: ''},
  })

  const handleSubmit = async (values: z.infer<typeof AddFriendDialogSchema>) => {
    await createRequest({ email: values.email })
      .then(() => {
        form.reset();
        toast.success("Friend request sent!");
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "Unexpected error occurred"
        );
      });
  };
  
  return (
    <Dialog>
      <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
            <DialogTrigger asChild>
          <Button size="icon" variant="outline">
              <UserPlus />
          </Button>
            </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Friend</p>
        </TooltipContent>
      </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>
            Add a friend by email
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={pending} type="submit">
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      </Dialog>
  )
}

export default AddFriendDialog
