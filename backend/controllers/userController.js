const prisma = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      return res.status(400).send('All input is required');
    }

    const oldUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (oldUser) {
      return res.status(409).send('User already exists. Please login');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      },
    });

    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.TOKEN_KEY,
      { expiresIn: '2h' }
    );

    return res.status(201).json({
      _id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send('All input is required');
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.TOKEN_KEY,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      _id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};
