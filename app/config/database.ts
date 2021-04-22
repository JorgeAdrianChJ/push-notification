import mongoose from 'mongoose';

export default async () => {
  // Connect to the database
  try {
    await mongoose.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //mongodb://root:MlKWsZzGc1Ji@3.217.3.17:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false
    mongoose.set('useCreateIndex', true);
  } catch (e) {
    console.error(`Couldn't connect to the database: ${e}`);
    process.exit(1);
  }
};
