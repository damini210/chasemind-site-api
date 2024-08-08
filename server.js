const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/config');

connectDB();

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
