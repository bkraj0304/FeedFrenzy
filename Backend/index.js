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
// Middleware setup
app.use(cors());
app.use(express.json());

// Start the server and connect to the database
app.listen(3001, () => {
    console.log("Server running on port 3001");
    
});

// Route handler for registration

/*User Registration*/
app.post('/register', userRegisterController);

/*user Login*/
app.post('/login',userLogin);

app.post('/post',postInsert);

app.get('/getposts',getposts);

app.get('/deletepost',deleteposts);

app.get('/getFriends',getFriendlist);

app.post('/sendRequest',sendRequest);

app.get('/getrequest',getRequestDetails);

app.post('/acceptRequest',sendacceptRequest);

app.post('/getUserFriends',getUserFriendList);

app.post('/rejectRequest',sendRejectRequest);

app.post('/removeFriendRequest',sendRemoveFriendRequest);

app.post('/getFriendsPosts',getFriendsPosts);

app.post('/handleComment',insertComment);

app.post('/getComments',getPostComments);

app.post('/getUserDetails',getUserDetails);