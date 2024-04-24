const mongoose=require('mongoose');

const DataSchema = mongoose.Schema({
        userID:{type:mongoose.Schema.Types.ObjectId,required:true},
        productID:{type:mongoose.Schema.Types.ObjectId,required:true},

    },
    {timestamps: true,versionKey:false}
)

const WishModel=mongoose.model('wishess',DataSchema)

module.exports = WishModel;