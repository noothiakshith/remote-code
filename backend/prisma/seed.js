import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  try {
    // Test connection
    await prisma.$connect();
    console.log('Connected to database successfully');

    // Clear existing data in correct order (respecting foreign key constraints)
    console.log('Clearing existing data...');
    await prisma.submission.deleteMany({});
    await prisma.problem.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.language.deleteMany({});
    console.log('Existing data cleared.');

    // Create sample languages
    console.log('Creating languages...');
    const cpp = await prisma.language.create({
      data: {
        id: 1,
        name: 'C++',
        extension: '.cpp',
        compileCommand: 'g++ main.cpp -o main',
        executionCommand: './main',
        testCommand: './main < input.txt > output.txt'
      }
    });

    const python = await prisma.language.create({
      data: {
        id: 2,
        name: 'Python',
        extension: '.py',
        compileCommand: '',
        executionCommand: 'python main.py',
        testCommand: 'python main.py < input.txt > output.txt'
      }
    });

    console.log('Languages created:', { cpp: cpp.name, python: python.name });

    // Create sample user
    console.log('Creating user...');
    const hashedPassword = await hash('password', 10);
    const user = await prisma.user.create({
      data: {
        username: 'testuser',
        email: 'testuser@example.com',
        password: hashedPassword
      }
    });

    console.log('User created:', user.username);

    // Create sample problem
    console.log('Creating problem...');
    const problem = await prisma.problem.create({
      data: {
        title: 'Two Sum',
        description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
        difficulty: 'Easy'
      }
    });

    console.log('Problem created:', problem.title);

    // Create sample submission
    console.log('Creating submission...');
    const submission = await prisma.submission.create({
      data: {
        problemId: problem.id,
        source_code: `def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]`,
        mainFuncName: 'twoSum',
        stdin: ['[2,7,11,15]', '9'],
        stdout: '[0,1]',
        language_id: python.id,
        userId: user.id,
        executionContainerId: 'container_1234',
        status: 'Successful',
        testCasesPassed: ['TC1', 'TC2'],
        runtime: 1.23,
        memoryUsage: 15.5
      }
    });

    console.log('Submission created:', submission.id);
    console.log('Seeding complete ✅');

  } catch (error) {
    console.error('Error during seed:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    });
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();