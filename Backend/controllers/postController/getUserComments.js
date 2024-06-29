var postCommentGetDB = require('../../helpers/userPostCommentsGetDB');

module.exports = async function (req, res, next) {
    // const userId=req.query.userId
    const{postid}=req.body;
    // console.log("postComment",req.body);
    // console.log(req.body);
        var newMember = {
        postId: postid,
    };

    /* Check if userName already exists in the DB --> don't insert --> return Error message to UI */
    /* If user doesn't exist ---> insert in DB */

    // console.log("newMember",newMember);
    let message = await postCommentGetDB(newMember);
    // console.log("postCommentgetDBController",message);
    res.send(message);
}