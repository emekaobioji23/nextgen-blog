const express = require('express');
const { findUserById, findUserByIdAndUpdate, deleteUserById, 
    getAllUsers, createUser,isUserAuthorized,authenticateUser } = require('../controllers/user');

const router =express.Router();

router.route('/:userId').get(findUserById).patch(isUserAuthorized,findUserByIdAndUpdate).delete(deleteUserById)
router.get("/",getAllUsers)
router.post("/",createUser)
router.post("/login",authenticateUser)

module.exports = router;