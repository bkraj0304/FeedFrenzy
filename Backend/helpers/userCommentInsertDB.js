const connection =require('../utilities/db.js'); 

module.exports=async function userCommentDB(newMemberData){
    // console.log("CommentInsertDBB",newMemberData);
    let {comment,friendId,friendName,postId,userId,userName,userGender} = newMemberData;
    // console.log("1",post_title,post_body,user_id);
    var commentInsert={
        message: null
    }

    try{
        let commentInsertData= await new Promise(function (resolve,reject){
            const query='INSERT INTO  user_comments (userComment,postId,friendId,friendName,userId,userName,userGender) VALUES (? ,? ,? ,?,?,?,?)';
            connection.query(query, [comment,postId,friendId,friendName,userId,userName,userGender],(err,result)=>{
                if(err){
                    // console.log('Error Inserting data');
                    commentInsert.message='Error Inserting data';
                    resolve(commentInsert);
                } else{
                    commentInsert.message='Comment Inserted Successfully';
                    resolve(commentInsert);
                }
            });
        }).then(function(data){
            return data
        }).catch(function(err){
            // console.log('Exception: Error inserting dara');
            commentInsert.message='Exception: Error inserting dara';
            return(commentInsert);
            
        });
        return (commentInsertData);
    } catch(err){
        commentInsert.message='Error';
        return(commentInsert);
    }
};