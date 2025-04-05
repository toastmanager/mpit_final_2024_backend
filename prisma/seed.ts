import { Prisma, PrismaClient } from '@prisma/client';
import { fakerRU } from '@faker-js/faker';

function randomInt(min: number, max: number): number {
	if (min > max) {
		throw new Error('Min value cannot be greater than max value.');
	}

	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const prisma = new PrismaClient();

// async function main() {
// 	await seedPersons();
// 	await seedBooks();
// }

// async function seedPersons() {
// 	await prisma.person.deleteMany();

// 	const persons: Prisma.PersonCreateInput[] = Array.from(
// 		{ length: 800 },
// 		() => ({
// 			name: fakerRU.person.fullName(),
// 		}),
// 	);

// 	await prisma.person.createMany({ data: persons });

// 	console.log(`Создано ${persons.length} пользователей`);
// }

// async function seedBooks() {
// 	await prisma.book.deleteMany();

// 	const books: Prisma.BookCreateManyInput[] = Array.from(
// 		{ length: 1000 },
// 		() => ({
// 			authorId: randomInt(1, 500),
// 			description: fakerRU.lorem.paragraphs(randomInt(5, 20)),
// 			title: fakerRU.book.title(),
// 			pages: randomInt(50, 2000),
// 			ageRestriction: randomInt(0, 18),
// 			publisherId: randomInt(501, 700),
// 			translatorId: randomInt(701, 800),
// 		}),
// 	);

// 	await prisma.book.createMany({ data: books });

// 	console.log(`Создано ${books.length} книг`);
// }

// main()
// 	.catch((e) => {
// 		console.error(e);
// 		process.exit(1);
// 	})
// 	.finally(async () => {
// 		await prisma.$disconnect();
// 	});
