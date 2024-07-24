import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const createUser = internalMutation({
  args: {
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string()
  },
  handler(ctx, args_0) {
    const { email, imageUrl, clerkId, name } = args_0;
    return ctx.db.insert("users", {
      email,
      imageUrl,
      clerkId,
      name
    });
  }
});
