import { z } from "zod";

export const CommentFormSchema = z.object({
  content: z.string().min(1),
  postId: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val)),
});