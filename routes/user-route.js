const express = require('express');
const { findUserById, findUserByIdAndUpdate, deleteUserById, 
    getAllUsers, createUser,isUserAuthorized,authenticateUser,protected } = require('../controllers/user-controller');

const router =express.Router();

router.route('/:id').get(findUserById).patch(protected,isUserAuthorized,findUserByIdAndUpdate).delete(deleteUserById)
router.get("/",getAllUsers)
router.post("/",createUser)
router.post("/login",authenticateUser)
//router.post("/protected",protected)

module.exports = router;