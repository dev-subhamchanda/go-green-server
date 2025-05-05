const mongoose = require('mongoose');

// Define the schema for a Member
const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // To ensure no duplicate emails
    },
    phone: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create a model based on the schema
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
// This model can be used to interact with the 'members' collection in the MongoDB database.
// You can perform CRUD operations using this model, such as creating a new member, finding members, updating, and deleting them.