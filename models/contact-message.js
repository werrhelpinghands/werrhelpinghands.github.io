const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contactMessage = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: false
    },
    message:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

var Messages = mongoose.model('Message',contactMessage);
module.exports = Messages;