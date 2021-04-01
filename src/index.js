const { port } = require('./config');
const app = require('./app');

async function init() {
  await app.listen(port);
  console.log(`Server on port: ${port}`);
}

init();