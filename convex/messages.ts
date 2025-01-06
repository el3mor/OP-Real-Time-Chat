import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";


export const get = query({
  args:{
    id: v.id("conversations") 
  },
  handler: async (ctx, args) => {
     const identity = await ctx.auth.getUserIdentity();
    
        if (!identity) {
          throw new Error("Unauthorized");
        }
    
        const currentUser = await getUserByClerkId({
          ctx,
          clerkId: identity.subject,
        });
    
        if (!currentUser) {
          throw new ConvexError("User not found");
        }

        const massages = await ctx.db.query("messages").withIndex("by_conversationId", (q) => q.eq("conversationId", args.id)).order("desc").collect();

        const massageWithUsers = Promise.all(massages.map(async (massage) => {
          const messageSender = await ctx.db.get(massage.sender);

          if (!messageSender) {
            throw new ConvexError("Could not find sender of message");
          }

          return {
            massage,
            senderImage: messageSender.imageUrl,
          senderName: messageSender.username,
          isCurrentUser: messageSender?._id === currentUser._id,
          }
        }))
    return massageWithUsers;
  }
})


