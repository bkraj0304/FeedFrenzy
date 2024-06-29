const connection =require('../utilities/db.js'); 

module.exports=async function userPostDB(newMemberData){
    // console.log(newMemberData);
    let {post_title,post_body,user_id} = newMemberData;
    // console.log("1",post_title,post_body,user_id);

    try{
        let postInsertData= await new Promise(function (resolve,reject){
            const query='INSERT INTO  user_posts (post_title,post_body,user_id) VALUES (? ,? ,? )';
            connection.query(query, [post_title,post_body,user_id],(err,result)=>{
                if(err){
                    // console.log('Error Inserting data');
                    resolve('Error Inserting data');
                } else{
                    // console.log('Data entered succesfully');
                    resolve('Data entered succesfully');
                }
            });
        }).then(function(data){
            return data
        }).catch(function(err){
            // console.log('Exception: Error inserting dara');
            return('Exception: Error inserting dara');
        });
        return (postInsertData);
    } catch(err){
        // console.log('error while findinng user data from database');
        return('Error');
    }
};