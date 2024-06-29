var postInsertDBController = require('../../helpers/userPostDB');

module.exports = async function (req, res, next) {
    const {title,content,user_id} = req.body; 
    // console.log("22",title,content,user_id)
    // console.log(req.body);
        var newMember = {
        post_title: title,
        post_body: content,
        user_id: user_id,
    };

    /* Check if userName already exists in the DB --> don't insert --> return Error message to UI */
    /* If user doesn't exist ---> insert in DB */

    // console.log("newMember",newMember);
    let message = await postInsertDBController(newMember);
    // console.log("postInsertDBController",message);
    res.send(message);
}