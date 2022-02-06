const router =require('express').Router();
const {getAllThought,addThought,removeThought,updateThought,addReaction,removeReaction, getOneThought} = require('../../controllers/thought-controller')
router.route('/').get(getAllThought).post(addThought)
router.route('/').post(addThought);
router.route('/:thoughtId')
.put(updateThought)
.delete(removeThought)
.get(getOneThought)

router.route('/:thoughtId/').post(addReaction)

router.route('/:thoughtId/:reactionId').delete(removeReaction)
module.exports=router