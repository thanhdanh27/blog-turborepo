"use server"

import { authFetchGraphQL, fetchGraphQL } from "@/lib/fetchGraphQl";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "@/lib/gqlQueries";
import { CreateCommentFormState } from "@/lib/types/formState";
import { CommentEntity } from "@/lib/types/modelTypes";
import { CommentFormSchema } from "@/lib/zodSchemas/commentFormSchema";
import {print} from "graphql"
import { number, string } from "zod";

export async function getPostComments({
    postId,
    skip,
    take,
}:{
    postId: number;
    skip: number;
    take: number;
})
{
    const data = await fetchGraphQL(print(GET_POST_COMMENTS),{
        postId,
        skip,
        take
    });

    return {
        comments: data.getPostComments as CommentEntity[],
        count:data.postCommentCount as number

    }
}

export async function saveComment(state:CreateCommentFormState, formData:FormData):Promise<CreateCommentFormState>{
    const validatedFields = CommentFormSchema.safeParse(
        Object.fromEntries(formData.entries())
      );
    
      if (!validatedFields.success)
        return {
          data: Object.fromEntries(formData.entries()),
          errors: validatedFields.error.flatten().fieldErrors,
        };
    
      const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
        input: {
          ...validatedFields.data,
        },
      });
    
     
    
      if (data)
        return {
          message: "Success! Your comment saved!",
          ok: true,
          
        };
    
      return {
        message: "Oops! Something went wrong!",
        ok: false,
        data: Object.fromEntries(formData.entries()),
      };
}