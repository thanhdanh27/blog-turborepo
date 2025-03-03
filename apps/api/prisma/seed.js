"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const argon2_1 = require("argon2");
const prisma = new client_1.PrismaClient();
function generateSlug(title) {
    return title.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}
async function main() {
    const defaultPassword = await (0, argon2_1.hash)("user@123");
    const users = Array.from({ length: 10 }).map(() => ({
        name: faker_1.faker.person.fullName(),
        email: faker_1.faker.internet.email(),
        bio: faker_1.faker.person.bio(),
        avatar: faker_1.faker.image.avatar(),
        password: defaultPassword,
    }));
    await prisma.user.createMany({
        data: users
    });
    const posts = Array.from({ length: 400 }).map(() => ({
        title: faker_1.faker.lorem.sentences(),
        slug: generateSlug(faker_1.faker.lorem.sentence()),
        content: faker_1.faker.lorem.paragraphs(3),
        thumbnail: faker_1.faker.image.urlLoremFlickr(),
        published: true,
        authorId: faker_1.faker.number.int({ min: 1, max: 10 })
    }));
    await Promise.all(posts.map(async (post) => await prisma.post.create({
        data: {
            ...post,
            comments: {
                createMany: {
                    data: Array.from({ length: 20 }).map(() => ({
                        content: faker_1.faker.lorem.sentence(),
                        authorId: faker_1.faker.number.int({ min: 1, max: 10 }),
                    }))
                }
            }
        }
    })));
    console.log("Seeding completed");
}
main().then(() => {
    prisma.$disconnect();
    process.exit(0);
}).catch(e => {
    prisma.$disconnect();
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map