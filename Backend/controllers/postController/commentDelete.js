var commentDeleteController = require('../../helpers/commentDeleteDB');

module.exports = async function (req, res, next) {
    // console.log("Raj2");
    const commentId = req.query.commentId;

    console.log("commentId",commentId);
        var newMember = {
        commentid: commentId,
    };

    /* Check if userName already exists in the DB --> don't insert --> return Error message to UI */
    /* If user doesn't exist ---> insert in DB */

    // console.log("newMember",newMember);
    let message = await commentDeleteController(newMember);
    console.log("commentDeleteController",message);
    res.send(message);
}