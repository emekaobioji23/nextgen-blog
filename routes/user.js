const express = require('express');
const { findUserById, findUserByIdAndUpdate, deleteUserById, getAllUsers, createUser,isUserAuthorized } = require('../controllers/user');

const router =express.Router();

router.route('/:userId').get(findUserById).patch(isUserAuthorized,findUserByIdAndUpdate).delete(deleteUserById)
router.get("/",getAllUsers)
router.post("/",createUser)

module.exports = router;