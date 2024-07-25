// Import required modules
const express = require("express");
const cors = require('cors');
const connection = require('./utilities/db'); // Correct import for your database connection
const bcrypt=require('bcrypt');
const app = express();
var userRegisterController = require('./controllers/LoginController/userRegister');
var userLogin = require('./controllers/LoginController/userLogin');
var postInsert =require('./controllers/postController/postInsert');
var getposts =require('./controllers/postController/postget');
var deleteposts =require('./controllers/postController/postDelete') ;
var getFriendlist =require('./controllers/FriendsController/getFriendList');
var sendRequest=require('./controllers/FriendsController/sendRequest');
var getRequestDetails=require('./controllers/FriendsController/getRequestDetails');
var sendacceptRequest=require('./controllers/FriendsController/sendAcceptRequest');
var getUserFriendList=require('./controllers/FriendsController/getUserFriendList');
var sendRejectRequest=require('./controllers/FriendsController/sendRejectRequest');
var sendRemoveFriendRequest=require('./controllers/FriendsController/sendRemoveFriend');
var getFriendsPosts=require('./controllers/postController/getFriendsPosts');
var insertComment=require('./controllers/postController/insertComment');
var getPostComments=require('./controllers/postController/getUserComments');
var getUserDetails=require('./controllers/postController/getUserDetails');
var deleteComments=require('./controllers/postController/commentDelete');
const verifyJWTMiddleWare=require('./middleware/auth');
// Middleware setup
app.use(cors());
app.use(express.json());
const port=process.env.PORT || 3001;
// Start the server and connect to the database
app.listen(port, () => {
    console.log("Server running on port 3001");
    
});

// Route handler for registration

/*User Registration*/
app.post('/register', userRegisterController);

/*user Login*/
app.post('/login',userLogin);

app.post('/post',[verifyJWTMiddleWare],postInsert);

app.get('/getposts',[verifyJWTMiddleWare],getposts);

app.get('/deletepost',[verifyJWTMiddleWare],deleteposts);

app.get('/getFriends',[verifyJWTMiddleWare],getFriendlist);

app.post('/sendRequest',[verifyJWTMiddleWare],sendRequest);

app.get('/getrequest',[verifyJWTMiddleWare],getRequestDetails);

app.post('/acceptRequest',[verifyJWTMiddleWare],sendacceptRequest);

app.post('/getUserFriends',[verifyJWTMiddleWare],getUserFriendList);

app.post('/rejectRequest',[verifyJWTMiddleWare],sendRejectRequest);

app.post('/removeFriendRequest',[verifyJWTMiddleWare],sendRemoveFriendRequest);

app.post('/getFriendsPosts',[verifyJWTMiddleWare],getFriendsPosts);

app.post('/handleComment',[verifyJWTMiddleWare],insertComment);

app.post('/getComments',[verifyJWTMiddleWare],getPostComments);

app.post('/getUserDetails',[verifyJWTMiddleWare],getUserDetails);

app.get('/deletecomment',[verifyJWTMiddleWare],deleteComments);