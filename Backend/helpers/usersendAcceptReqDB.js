
const connection = require('../utilities/db.js');

module.exports = async function usersendAcceptReqDB(newMemberData) {
    let { friendId, friendName,friendGender, sender_id, sender_name,senderGender } = newMemberData;
    var acceptfriendReqest={
        message: null,
    }

    try {
        // Begin transaction
        await new Promise((resolve, reject) => {
            connection.beginTransaction(err => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Insert two rows into friends_list
        let friendAcceptData = await new Promise((resolve, reject) => {
            const query = 'INSERT INTO friends_list (friend_id, friend_name,friend_gender, user_id, user_name,user_gender) VALUES (?, ?, ?, ?,?,?), (?, ?, ?, ?,?,?)';
            connection.query(query, [friendId, friendName,friendGender, sender_id, sender_name,senderGender, sender_id, sender_name,senderGender, friendId, friendName,friendGender], (err, result) => {
                if (err) reject('Error Inserting data');
                else resolve('Request Accept successfully');
            });
        });

        if (friendAcceptData === 'Request Accept successfully') {
            // Update two rows in friends_request table
            let updateRequestStatus = await new Promise((resolve, reject) => {
                const updateQuery = 'UPDATE friends_request SET req_status = ? WHERE (userId_RequestedFrom = ? AND userId_RequestedTo = ?) OR (userId_RequestedFrom = ? AND userId_RequestedTo = ?)';
                connection.query(updateQuery, ['Accepted', friendId, sender_id, sender_id, friendId], (err, result) => {
                    if (err) reject('Error updating request status');
                    else resolve('Request status updated successfully');
                });
            });

            if (updateRequestStatus === 'Request status updated successfully') {
                await new Promise((resolve, reject) => {
                    connection.commit(err => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                acceptfriendReqest.message='Friend request accepted and statuses updated successfully';
                return (acceptfriendReqest);
            } else {
                await new Promise((resolve, reject) => {
                    connection.rollback(err => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                acceptfriendReqest.message=updateRequestStatus;
                return (acceptfriendReqest);
            }
        } else {
            await new Promise((resolve, reject) => {
                connection.rollback(err => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            acceptfriendReqest.message=friendAcceptData;
            return acceptfriendReqest;
        }
    } catch (err) {
        await new Promise((resolve, reject) => {
            connection.rollback(err => {
                if (err) reject(err);
                else resolve();
            });
        });
        acceptfriendReqest.message='Error';
        return (acceptfriendReqest);
    }
};
