const {Schema, model}=require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
        required:'username is required'
    },
   email:{
        type:String,
        trim:true,
        unique:true,
        required:'email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    createdAt:{
        type:Date,
        default: Date.now,
        get:(createdAtVal)=> dateFormat(createdAtVal)
    },

  thoughts:[
        {
            type:Schema.Types.ObjectId,
            // tells user model where to search to find the right thoughts
            ref:'Thought'
        }
    ],
    friends:[],

},
{
    toJSON:{
        virtuals:true,
        getters:true
    },
    id:false
}
);

//get total count of friends 
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});
//cerate the User model using the UserSchema
const User =model('User',UserSchema);

//export the User model
module.exports = User;