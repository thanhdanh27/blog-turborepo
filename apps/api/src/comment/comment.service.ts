import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constant';
import { connect } from 'http2';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService){}
  async findOneByPost({postId,take,skip}:{postId:number;take?:number;skip?:number})
  {
     return await this.prismaService.comment.findMany({
      where:{
        postId
      },
      include:{
        author: true
      },
      orderBy:{
        createdAt: "desc"
      },
      skip: skip ?? 0,
      take: take ?? DEFAULT_PAGE_SIZE,
     })
  }

  async count(postId:number)
  {
    return await this.prismaService.comment.count({where:{postId}})
  }

  async create(createCommentInput:CreateCommentInput, authorId:number){
    return await this.prismaService.comment.create({
      data:{
        content: createCommentInput.content,
        post:{
          connect:{
            id:createCommentInput.postId
          }
        },
        author:{
          connect:{
            id:authorId
          }
        }
      }
    })
  }
}
