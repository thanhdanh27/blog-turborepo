import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/constant';
import { CreatePostInput } from 'src/post/dto/create-post.input';
import { UpdatePostInput } from 'src/post/dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}
  async findAll({skip= 0, take= DEFAULT_PAGE_SIZE}:{skip?:number; take?:number}) {
  
    
    return await this.prisma.post.findMany({skip,take})
  }

  async count()
  {
    return await this.prisma.post.count()
  }

  async findOne(id:number)
  {
    return await this.prisma.post.findFirst({
      where:{
        id,
      },
      include:{
        author:true,
        tags:true
      }
    })
  }

  async findByUser({userId,take,skip}:{userId:number,skip:number,take:number})
  {
    return await this.prisma.post.findMany({
      where:{
        author:{
          id:userId,
        }
      },
      select:{
        id:true,
        title:true,
        thumbnail:true,
        content:true,
        createdAt:true,
        slug:true,
        published:true,
        _count:{
          select:{
            comments:true,
            likes:true
          }
          
        }
      },
      take,
      skip
    })
  }

  async userPostCount(userId:number)
  {
    return await this.prisma.post.count({
      where:{
        authorId:userId,
      }
    })
  }

  async create({createPostInput,authorId}:{createPostInput:CreatePostInput,authorId:number})
{
  return await this.prisma.post.create({
    data:{
      ...createPostInput,
      author:{
        connect:{
          id:authorId
        }
      },
      tags:{
        connectOrCreate:createPostInput.tags.map(tag =>({
          where:{name:tag},
          create:{name:tag}
        }))
      }
    }
  })
}

async update({userId,updatePostInput}:{userId:number,updatePostInput:UpdatePostInput})
{
  const authorIdMatched = await this.prisma.post.findUnique({
    where:{
      id:updatePostInput.postId,
      authorId: userId
    }
  })

  if(!authorIdMatched) throw new UnauthorizedException();
  const {postId, ...data} = updatePostInput
  return await this.prisma.post.update({
    where:{
      id:updatePostInput.postId
    },
    data:{
      ...data,
      tags:{
        set:[],
        connectOrCreate:updatePostInput.tags?.map((tag)=>({
          where:{
            name:tag
          },
          create:{
            name:tag
          }
        }))
      }
    }
  })
}

async delete({userId,postId}:{userId:number,postId:number})
{
  const authorIdMatched = await this.prisma.post.findUnique({
    where:{
      id:postId,
      authorId: userId
    }
  })

  if(!authorIdMatched) throw new UnauthorizedException();
  const result = await this.prisma.post.delete({
    where:{
      id:postId,
      authorId: userId
    }
  })
  return !!result
}

}
