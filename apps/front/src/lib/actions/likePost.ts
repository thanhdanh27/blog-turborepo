"use server"
import {print} from "graphql"

import { authFetchGraphQL } from "@/lib/fetchGraphQl"
import { LIKE_POST_MUTATION, POST_LIKES, UNLIKE_POST_MUTATION } from "@/lib/gqlQueries"

export async function getPostLikeData(postId: number) {
    const data = await authFetchGraphQL(print(POST_LIKES), {
      postId,
    });
  
    return {
      likeCount: data.postLikesCount as number,
      userLikedPost: data.userLikedPost as boolean,
    };
  }

export async function likePost(postId: number){
  const data = await authFetchGraphQL(print(LIKE_POST_MUTATION),{
    postId
  })
  return data
}

export async function unLikePost(postId: number){
  const data = await authFetchGraphQL(print(UNLIKE_POST_MUTATION),{
    postId
  })
  return data
}