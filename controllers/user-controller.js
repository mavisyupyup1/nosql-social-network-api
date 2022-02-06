const {User} =require('../models');
const userController = {
    // the functions will go in here as methods
    // get all users
    getAllUser(req,res){
       User.find({})
        .populate({
            path:'thoughts',
            select:'-__v'
        })
        .select('-__v')
        .sort({_id:-1})
        .then(dbUserData=> res.json(dbUserData))
        .catch(err=>{
            console.log(err);
            res.status(400).json(err);
        })
    },

    //get user by id
    getUserById({params},res){
        User.findOne({_id:params.id})
        .populate({
            path:'thoughts',
            select:'-__v'
        })
        .select('-__v')
        .then(dbUserData=>{
            //if no pizza is found, send 404
            if(!dbUserData){
                res.status(404).json({message:'No user found with this id'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err)
        })
    },
  
      // createUser
  createUser({ body }, res) {
   User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

    //update a user by id
    updateUser({params,body},res){
        User.findByIdAndUpdate({_id:params.id},body,{new:true})
        .then(dbUserData=>{
            if(!dbUserData){
                res.status(400).json({message:'No user found with this id!'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err=>res.status(400).json(err))
    },
    //delete user
    deleteUser({params},res){
        User.findOneAndDelete({_id:params.id})
        .then(dbUserData=>{
            if(!dbUserData){
                res.status(404).json({message:'No user found with this id!'})
                return;
            }
            res.json("User deleted")
        })
        .catch(err=>res.status(400).json(err))
    },

    addFriend({ params }, res) {
       User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId} }, { new: true })
          .then(dbFriendData => {
            if (!dbFriendData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbFriendData);
          })
          .catch(err => res.json(err));

        },
    deleteFriend({params},res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
          )
            .then(dbUserData => {
              if (!dbUserData) {
                return res.status(404).json({ message: 'No User with this id!' });
              }
              res.json(dbUserData);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
    }
}

module.exports=userController;