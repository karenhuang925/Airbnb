require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/spots', require('./routes/spots'));
app.use('/bookings', require('./routes/bookings'));
app.use('/reviews', require('./server/routes/reivews'));
app.use('/images', require('./routes/images'));

if (require.main === module) {
  const port = 8005;
  app.listen(port, () => console.log('Server-5 is listening on port', port));
} else {
  module.exports = app;
}
