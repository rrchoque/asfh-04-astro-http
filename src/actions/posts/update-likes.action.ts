import { defineAction } from "astro:actions";
import { db, eq, Posts } from "astro:db";
import { z } from "astro:schema";

export const updatePostLikes = defineAction({
  accept: "json",
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  async handler({ postId, increment }) {
    const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));

    if (!post) {
      const newPost = {
        id: postId,
        title: "Post not found",
        likes: 0,
      };

      await db.insert(Posts).values(newPost);
    } else {
      post.likes = post.likes + increment;
    }

    await db
      .update(Posts)
      .set({
        likes: post.likes,
      })
      .where(eq(Posts.id, postId));

    return { likes: post.likes };
  },
});
