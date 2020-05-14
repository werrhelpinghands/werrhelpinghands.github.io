const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    tags:{
        type: Array,
        default: []
    },
    company:{
        type: String,
        required: true
    },
    website:{
        type: String,
    },
    about:{
        type: String,
        required: true
    },
    roles:{
        type: Array,
        default: []
    },
    skills:{
        type: Array,
        default: []
    },
    location:{
        type: String,
    },
    duration:{
        type: String,
    },
    pay:{
        type: String,
    },
    available:{
        type: String,
    },
    expireAt:{
        type: Date,
    },
    url:{
        type: String
    },
    logo:{
        type: String
    },
    notification:{
        type: String
    },
    portal:{
        type: String
    }
},{
    timestamps: true
})

var Job = mongoose.model("Job", jobSchema);
module.exports = Job;