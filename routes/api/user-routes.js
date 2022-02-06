const router = require('express').Router()
const{
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
}=require('../../controllers/user-controller')
//set up Get all and POST at /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

//set up GET one PUt and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)
module.exports=router;
