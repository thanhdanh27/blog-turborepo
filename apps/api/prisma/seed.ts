import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

function generateSlug(title: string): string // trả về string, rõ ràng hơn
{
    return title.toLowerCase().trim().replace(/ /g,'-').replace(/[^\w-]+/g, '')
}

 
async function main() {
    const defaultPassword = await hash("user@123")
    const users = Array.from({length:10}).map(() =>({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        bio: faker.person.bio(),
        avatar: faker.image.avatar(),
        password: defaultPassword,

    }))

    await prisma.user.createMany({
        data: users
    })

    const posts = Array.from({length:400}).map(() =>({
        title: faker.lorem.sentences(),
        slug: generateSlug(faker.lorem.sentence()),
        content: faker.lorem.paragraphs(3),
        thumbnail: faker.image.urlLoremFlickr(),
        published: true,
        authorId: faker.number.int({min:1, max:10})
    }))

    await Promise.all(
        posts.map(async (post) => await prisma.post.create({
            data:{
                 ...post,
                comments:{
                    createMany:{
                        data: Array.from({length:20}).map(() =>({
                            content: faker.lorem.sentence(),
                            authorId: faker.number.int({min:1, max:10}),
                        }))
                    }
                }
            }
    
        }))
    ) 
    console.log("Seeding completed")
}

main().then(() =>{
    prisma.$disconnect();
    process.exit(0);

}).catch(e =>{
    prisma.$disconnect();
    console.error(e);
    process.exit(1);
})