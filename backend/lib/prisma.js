const { PrismaClient } = require('@prisma/client');

// Prevent multiple PrismaClient instances during nodemon hot reloads
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

module.exports = prisma;
