const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb://myUserAdmin:${password}@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=mongosh+2.3.1`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} else if (process.argv.length === 3) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name + " " + person.number);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(result + " person saved!");
    mongoose.connection.close();
  });
}
