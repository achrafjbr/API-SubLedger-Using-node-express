const mongoose = require("mongoose");

/*

  const manyValidators = [
  { validator: isNotTooShort, msg: "Is too short" },
  { validator: onlyLettersAllow, msg: "Only Letters" },
];
const validateEmail = {
  validator: invalidEmail, msg: 'Email is not valide'
}
var userSchema = new Schema({
  name: { type: String, validate: manyValidators },
  email: { type: String, required: true, validate: validateEmail },
  createdOn: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
});


*/

// id
//name
//price
//billingCycle (monthly | yearly)
// userId

const subscriptionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  billingCycle: {
    type: String,
    enum: ["monthly", "yearly"],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

}, { timestamps: true });

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = {
  Subscription
}