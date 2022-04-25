const server = require('./app');
const { conn } = require('./db');

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  //server.listen(process.env.PORT || 3001, () => {
    server.listen(3001, ()=> {
    console.log('Server listening at port 3001'); // eslint-disable-line no-console
  });
});
