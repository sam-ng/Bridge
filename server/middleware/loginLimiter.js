const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message: 'Too many login attempts. Please try again after 60 seconds.',
  },
  handler: (req, res, next, options) => {
    console.log(
      `Too many login attempts: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
