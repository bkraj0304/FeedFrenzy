var postDeleteController = require('../../helpers/userPostDeleteDB');

module.exports = async function (req, res, next) {
    // console.log("Raj2");
    const postId = req.query.postid;
    // console.log("xyz",postId);
        var newMember = {
        postid: postId,
    };

    /* Check if userName already exists in the DB --> don't insert --> return Error message to UI */
    /* If user doesn't exist ---> insert in DB */

    // console.log("newMember",newMember);
    let message = await postDeleteController(newMember);
    // console.log("postInsertDBController",message);
    res.json({message});
}