
const connection = require('../utilities/db.js');

module.exports = async function userFriendsPostgetDB(newMemberData) {
    let { user_id } = newMemberData;
    // console.log("userFriendsPostgetDB raj:", newMemberData);
    
    var friendPostsDetails = {
        message: null,
        data: null
    };

    try {
        let userFriendsPostsData = await new Promise(function (resolve, reject) {
            const query = `
                            SELECT 
                                up.*, 
                                ui.user_name AS friend_name,
                                fl.friend_gender  -- Include friend's gender from friends_list
                            FROM 
                                user_posts up
                            JOIN 
                                user_info ui ON up.user_id = ui.user_id
                            JOIN 
                                friends_list fl ON up.user_id = fl.friend_id
                            WHERE 
                                fl.user_id = ?

                            `;
            
            connection.query(query, [user_id], (err, results) => {
                if (err) {
                    console.error("Database query error:", err);
                    friendPostsDetails.message = "Error fetching data";
                    resolve(friendPostsDetails);
                } else {
                    if (results.length > 0) {
                        friendPostsDetails.message = "Friends Details Fetched";
                        friendPostsDetails.data = results;
                        resolve(friendPostsDetails);
                    } else {
                        friendPostsDetails.message = "No friends found";
                        resolve(friendPostsDetails);
                    }
                }
            });
        }).then(function (data) {
            return data;
        }).catch(function (err) {
            friendPostsDetails.message = err;
            return friendPostsDetails;
        });
        
        return userFriendsPostsData;
    } catch (err) {
        console.error("Error in userFriendsPostgetDB:", err);
        friendPostsDetails.message = "Error while finding user data from database";
        return friendPostsDetails;
    }
};
