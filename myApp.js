const mongoose= require("mongoose");
const mySecret = process.env['MONGO_URI']
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person",personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({name: "diego",age: 24,favoriteFoods: ["estofado"]});
  person.save((err,data)=>{
    if (err){
      done(err,null);
    }
    done(null,data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,data)=>{
    if(err){
      done(err,null);
    }
    done(null,data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err,data)=>{
    if (err){
      done(err,null);
    }
    done(null,data);
  })

};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: {"$in": food}}, (err,data)=>{//https://www.mongodb.com/docs/manual/reference/operator/query/all/
    if (err){
      done(err,null);
    }
    done(null ,data);
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, (err,data)=>{
    if(err){
      done(err,null);
    }
    done(null,data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId}, (err,data)=>{
    if(err){
      done(err,null);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save( (err,data)=>{
      if(err){
        done(err,null);
      }
      done(null,data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new: true}, (err,data)=>{
    if(err){
      done(err,null);
    }
    done(null,data);
  });
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
