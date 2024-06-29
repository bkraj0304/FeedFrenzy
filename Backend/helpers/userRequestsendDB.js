const connection =require('../utilities/db.js'); 

module.exports=async function userRequestSendDB(newMemberData){
    // console.log(newMemberData);
    let {sender_id,req_id,sender_name,receiver_name} = newMemberData;
    

    try{
        let postRequestedData= await new Promise(function (resolve,reject){
            const query='INSERT IGNORE INTO  friends_request (userId_RequestedFrom,userId_RequestedTo,sender_name,receiver_name) VALUES (? ,?,?,? )';
            connection.query(query, [sender_id,req_id,sender_name,receiver_name],(err,result)=>{
                if(err){
                    
                    resolve('Error Inserting data');
                } else{
                    
                    if (result.affectedRows === 1) {
                        resolve('Request sent successfully');
                    } else {
                        resolve('Request Already sent or Person is alreay your Friend');
                    }
                }
            });
        }).then(function(data){
            return data
        }).catch(function(err){
            // console.log('Exception: Error inserting dara');
            return('Exception: Error inserting data');
        });
        return (postRequestedData);
    } catch(err){
        // console.log('error while findinng user data from database');
        return('Error');
    }
};