const express = require('express');
const router = express.Router()
const { createUser, getAllUserData, login } = require('../controller/userController');
const { authenticate,authorize } = require('../middleware/auth.js');
const { createpets, getAllpets, getpetsData, deleteBlog } = require('../controller/petsController.js');
const {createfeedback} = require('../controller/feedbackController.js')
const {createAdmin, Adminlogin} =require('../controller/adminController.js')

//<-------------This API used for Create User-------------------------------------------->//
router.post('/createUser', createUser);
//<-------------This API used for Get All User Data-------------------------------------->//
router.get('/getAllData', getAllUserData);
//<-------------This API used for LogIn User--------------------------------------------->//
router.post('/UserLogin', login);
//<-------------This API used for Blogger User------------------------------------------->//
router.post('/createpet', createpets);
// <----------------This API used for Fetch All Blogs of Logged in Author---------------->//
router.get("/allpets/:category", authenticate, getAllpets);
// //<----------------This API used for Fetch Blogs of Logged in Author------------------->//
router.get("/pets/:getPetsId", authenticate, getpetsData);                                   
//<----------------This API used for Update Blogs of Logged in Author------------------>//
// router.put("/pets/:petsId", authorize, updateBlog);
//<--------------u--These APIs used for Deleting Blogs---------------------------------->//
router.delete("/pets/:userId/:petId",authorize, deleteBlog);

router.post('/createfeedback', createfeedback);
router.post('/createAdmin', createAdmin);
router.post('/adminLogin', Adminlogin);

router.all("/*", (req, res) => {
    res.status(400).send({ status: false, message: "Url is not Correct" })
})

module.exports = router;

