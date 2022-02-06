const { Thought,User} = require('../models');

const thoughtController = {
  getAllThought(req,res){
    Thought.find({})
     .then(dbThoughtData=> res.json(dbThoughtData))
     .catch(err=>{
         console.log(err);
         res.status(400).json(err);
     })
 },
getOneThought({params},res){
  Thought.findOne({_id:params.thoughtId})
  .then(dbThoughtData=>{
    if(!dbThoughtData){
      res.status(404).json({message:"No thought found with this Id"})
      return
    }
    res.json(dbThoughtData)
  }).catch(err=>{
    console.log(err)
    res.status(400).json(err)
  })
},
updateThought({params,body},res){
  Thought.findByIdAndUpdate({_id:params.thoughtId},body,{new:true})
  .then(dbUserData=>{
      if(!dbUserData){
          res.status(400).json({message:'No thought found with this id!'})
          return;
      }
      res.json(dbUserData)
  })
  .catch(err=>res.status(400).json(err))
},
  // add thought to user
  addThought({ body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // remove thought
  removeThought({ params}, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId})
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' })
        }
        return res.json("Thought deleted")
      })
      .catch(err => res.json(err));
  },

 // add reaction to a thought
 addReaction({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found  with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
},
  
  removeReaction({params},res) {
      Thought.findOneAndUpdate(
        {_id:params.thoughtId},
        {$pull:{reactions:{_id:params.reactionId}}},
        {new:true}
      )
      .then(dbReactionData=>res.json(dbReactionData))
      .catch(err=>res.json(err))
    }
};

module.exports = thoughtController;
