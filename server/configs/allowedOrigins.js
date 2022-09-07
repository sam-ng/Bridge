const allowedOrigins = [
  `${process.env.SCHEME}${process.env.DOMAIN}:${process.env.CLIENT_PORT}`,
];

module.exports = allowedOrigins;
