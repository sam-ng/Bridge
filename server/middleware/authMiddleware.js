const jwt = require('jsonwebtoken');

const requireAuth = (res, req, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  // jwt.verify(token, process.env.TOKEN_SECRET, (err
};
