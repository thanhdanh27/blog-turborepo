import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor( private readonly prismaService:PrismaService){}
  async likePost({postId, userId}:{postId:number, userId:number}){
    try{
      return !!(await this.prismaService.like.create({
        data:{
          postId,
          userId
        }
      }))
    } catch(err){
      throw new BadRequestException("You have already liked this post")
    }
  }

  async unLikePost({postId, userId}:{postId:number, userId:number}){
    try{
      await this.prismaService.like.delete({
        where:{
          userId_postId:
          {
            postId,
            userId
        }
        }
      })
      return true;
    } catch(err){
      throw new BadRequestException("You haven't liked this post yet")
    }
  }

  async postLikesCount(postId:number){
    return await this.prismaService.like.count({
      where:{
        postId
      }
    })
  }

  async userLikedPost({postId, userId}:{postId:number, userId:number})
  {
    const like = await this.prismaService.like.findFirst({
      where:{
        postId,
        userId
      }
    })
    return !!like
  }

}
