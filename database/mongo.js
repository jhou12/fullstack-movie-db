const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/${process.env.MONGO_DB || 'test'}`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongoose connected!'));

const testSchema = new mongoose.Schema({
  testId: Number,
  testText: String
});

const Test = mongoose.model('Test', testSchema);

const readAll = async () => {
  try {
    let entries = await Test.find({});
    return entries
  } catch(e) {
    console.log('db readAll error:', e)
  }
}

module.exports = {
  mongoose,
  Test,
  readAll,
}