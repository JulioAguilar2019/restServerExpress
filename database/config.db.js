const mongoose = require('mongoose');
const dbConnection = async () => {
  try {
    mongoose.set('strictQuery', false);

    await mongoose.connect(process.env.MONGODB_CNN, {});
    console.log('Database online');
  } catch (e) {
    console.error(e);
    throw new Error('Error in database connection');
  }
};

module.exports = {
  dbConnection,
};
