const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
// Schema.Types.ObjectId is used to define a schema type for an ObjectId, which is a unique identifier for documents in MongoDB
const petsSchema = new mongoose.Schema({


    title: { type: String },
    Breed:{type:String},
    description: { type: String, required: true },
    userId:{type:ObjectId,require:true},
    price: { type: Number, required: true },
    picture: { type: String, required: false },
    offer: { type: String, requird: false },
    Main_Info: { 
        Origin:{type:String},
        Coat_Pattern:{type:String},
        Coat_Length:{type:String}
     },
    issues: {
        p1:{type:String},
        p2:{type:String},
        p3:{type:String},
        p4:{type:String}
    },
    categories:{type:String},
    delivery: { type: String, requird: true },
    specifications: { type: String, default: false },
    rating: { type: Number, required: true},
    isDeleted: { type: Boolean, default: false },
    deletedAt: {type: Date, require: true, default: Date.now},
    publishedAt: { type: Date, require: true, default: Date.now },
}, { timestamps: true });


module.exports = mongoose.model('pets', petsSchema)