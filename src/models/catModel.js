const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    title:{ type: String, required: true, trim: true },
    description:{ type: String, required: true, trim: true },
    price:{ type:Number, required: true, trim: true},
    catagery:{ type: String, required: true, trim: true },
    Main_Info: { 
        Target_Species:{type:String},
        Breed:{type:String},
        Material:{type:String},
        Recommended_Uses_For_Product: { type:String }
     },
},
    { timestamps: true }
)
module.exports = mongoose.model('Cat', catSchema);