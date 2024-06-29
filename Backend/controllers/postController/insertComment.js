var commentInsertDB = require('../../helpers/userCommentInsertDB');

module.exports = async function (req, res, next) {
    // console.log("Comment",req.body);
    const {comment,friendid,friendName,postid,userId,username,usergender} = req.body; 

        var newMember = {
        comment:comment,
        friendId:friendid,
        friendName: friendName,
        postId: postid,
        userId: userId,
        userName:username,
        userGender:usergender
    };

    /* Check if userName already exists in the DB --> don't insert --> return Error message to UI */
    /* If user doesn't exist ---> insert in DB */

    // console.log("newMember",newMember);
    let message = await commentInsertDB(newMember);
    // console.log("commentInsertDB",message);
    res.send(message);
}