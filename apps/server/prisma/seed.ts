import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient();

async function main() {
  await prisma.breed.deleteMany();
  await prisma.trait.deleteMany();
  await prisma.vaccine.deleteMany();
  // Seed data for Breed
  const breeds = [
    { name: 'Jack Russell' },
    { name: 'Collie cross' },
    { name: 'Labrador' },
    { name: 'Springer Spaniel' },
  ];
  for (const breed of breeds) {
    await prisma.breed.create({
      data: breed,
    });
  }

  // Seed data for Trait
  const traits = [
    { description: 'Quiet' },
    { description: 'Great with children' },
    { description: 'Affectionate' },
    { description: 'Loves to play' },
    { description: 'Very active' },
    { description: 'Big appetite' },
    { description: 'Friendly' },
    { description: 'Great around other dogs' },
  ];
  for (const trait of traits) {
    await prisma.trait.create({
      data: trait,
    });
  }

  // Seed data for Vaccine
  const vaccines = [
    { name: 'Rabies' },
    { name: 'Distemper' },
    { name: 'Parvovirus' },
  ];
  for (const vaccine of vaccines) {
    await prisma.vaccine.create({
      data: vaccine,
    });
  }

  const puppies = [
    {
      name: 'Samuel',
      age: 1,
      gender: 'male',
      size: 'small',
      photoUrl:
        'https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      breed: { connect: { name: 'Jack Russell' } },
      traits: {
        create: [
          { trait: { connect: { description: 'Quiet' } } },
          { trait: { connect: { description: 'Great with children' } } },
        ],
      },
      HealthRecord: {
        create: {
          neuteredStatus: true,
          medicalNotes: 'Healthy and active, regular check-ups needed.',
          vaccinations: {
            create: [
              {
                vaccine: { connect: { name: 'Rabies' } },
                vaccinatedOn: new Date(),
                nextDueDate: new Date(
                  new Date().setFullYear(new Date().getFullYear() + 1),
                ),
              },
            ],
          },
        },
      },
    },
    {
      name: 'Tillie',
      age: 2,
      gender: 'female',
      size: 'medium',
      photoUrl:
        'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      breed: { connect: { name: 'Collie cross' } },
      traits: {
        create: [
          { trait: { connect: { description: 'Affectionate' } } },
          { trait: { connect: { description: 'Loves to play' } } },
        ],
      },
      HealthRecord: {
        create: {
          neuteredStatus: true,
          medicalNotes: 'Playful and needs regular exercise.',
          vaccinations: {
            create: [
              {
                vaccine: { connect: { name: 'Rabies' } },
                vaccinatedOn: new Date(),
                nextDueDate: new Date(
                  new Date().setFullYear(new Date().getFullYear() + 1),
                ),
              },
            ],
          },
        },
      },
    },
    {
      name: 'Barnaby',
      age: 1,
      gender: 'male',
      size: 'large',
      photoUrl:
        'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      breed: { connect: { name: 'Labrador' } },
      traits: {
        create: [
          { trait: { connect: { description: 'Very active' } } },
          { trait: { connect: { description: 'Big appetite' } } },
        ],
      },
      HealthRecord: {
        create: {
          neuteredStatus: false,
          medicalNotes:
            'Requires a lot of physical activity and a well-monitored diet.',
        },
      },
    },
    {
      name: 'Emily',
      age: 3,
      gender: 'female',
      size: 'small',
      photoUrl:
        'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
      breed: { connect: { name: 'Springer Spaniel' } },
      traits: {
        create: [
          { trait: { connect: { description: 'Friendly' } } },
          { trait: { connect: { description: 'Great around other dogs' } } },
        ],
      },
      HealthRecord: {
        create: {
          neuteredStatus: true,
          medicalNotes: 'Social and friendly, good health overall.',
        },
      },
    },
  ];

  for (const puppy of puppies) {
    await prisma.puppy.create({
      data: puppy,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
