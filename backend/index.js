require('dotenv').config();

const express = require('express');
const cors = require('cors');
const prisma = require('./lib/prisma');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 8080;

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) =>
  res.status(200).json({ status: 'ok', db: 'postgresql', timestamp: new Date().toISOString() })
);

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

// Connect to PostgreSQL via Prisma then start server
prisma.$connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to PostgreSQL:', err);
    process.exit(1);
  });
