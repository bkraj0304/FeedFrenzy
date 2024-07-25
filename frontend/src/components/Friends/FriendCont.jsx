import { React, useCallback, useEffect, useState } from 'react';

import "../Styles/Friends.css";
import MaleImg from '../Assets/3135715.jpg';
import LadyImg from '../Assets/lady1.jpg';
import { useNavigate } from 'react-router-dom';
import ls from 'local-storage';

const FriendContainer = ({ data }) => {
    // console.log("FriendContainer",data);
    const [friendsData, setFriendsData] = useState(data);
    const [reqData, setreqData] = useState([]);
    const navigate = useNavigate();
    const [friendsList, setFriendsList] = useState([]);
    var userDetailsString = ls.get('userDetails');
    var userToken=ls.get('JWTToken');
    var userDetails = JSON.parse(userDetailsString);
    var sender_id = userDetails.userid;
    var sender_name = userDetails.username;

    const handleAddFriend = async (req_id, receiver_name) => {
        const response = await fetch('http://localhost:3001/sendRequest', {
            method: 'POST',
            headers: {
                'token':userToken,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ req_id, sender_id, sender_name, receiver_name })
        });

        const data = await response.text();
        //   console.log("handleAddFriend",data);
        if (data === "Request sent successfully") {
            // console.log("handleAddFriend",data);
            alert(data);
            setFriendsData(friendsData.filter(friend => friend.user_id !== req_id));
        }
        else {
            alert(data);
        }
    };

    const fetchrequest = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001/getrequest?userId=${sender_id}`, {
                method: 'GET',
                headers: {
                    'token':userToken,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const output = await response.json();
            // console.log("fetchrequest", output);
            if (output.message === "Friend Requests List:") {
                setreqData(output.data);
            }


        } catch (error) {
            console.error('fetchRequest:', error);
        }
    }, [sender_id,userToken]);

    const handleAcceptRequest = async (friendId, friendName, friendGender, senderGender) => {
        try {
            const response = await fetch('http://localhost:3001/acceptRequest', {
                method: 'POST',
                headers: {
                    'token':userToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ friendId, friendName, friendGender, sender_id, sender_name, senderGender })
            });
            // console.log("Hieeeeee");
            const data = await response.json();
            // console.log("handleAcceptRequest", data);

            alert(data.message);
            window.location.reload();
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleRejectRequest = async (friendId, userId) => {
        try {
            const response = await fetch('http://localhost:3001/rejectRequest', {
                method: 'POST',
                headers: {
                    'token':userToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ friendId, userId })
            });
            // console.log("Hieeeeee");
            const data = await response.json();
            // console.log("handleAcceptRequest", data);

            alert(data.message);
            window.location.reload();
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };
    const handleRemoveFriendRequest = async (friendId, userId) => {
        // console.log("handleRemoveFriendRequestRaj", friendId, userId);
        try {
            const response = await fetch('http://localhost:3001/removeFriendRequest', {
                method: 'POST',
                headers: {
                    'token':userToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ friendId, userId })
            });
            // console.log("Hieeeeee");
            const data = await response.json();
            // console.log("handleRemoveFriendRequest", data);

            alert(data.message);
            window.location.reload();
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };
    //   useEffect(() => {
    //     if (sender_id) {
    //       fetchrequest();
    //     }
    //   }, [sender_id,fetchrequest]);


    const fetchFriendsList = useCallback(async () => {
        // console.log("Hello0000");
        try {
            // console.log(sender_id,"Raj");
            const response = await fetch(`http://localhost:3001/getUserFriends`, {
                method: 'POST',
                headers: {
                    'token':userToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sender_id })

            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const acceptedList = await response.json();
            if (acceptedList.message === "Available Friends List") {
                // console.log("fetchFriendsList", acceptedList);
                setFriendsList(acceptedList.data);

            }
            else {
                // console.log("fetchFriendsList1", friendsList.length);

            }

        } catch (error) {
            console.error('fetchFriendsList :', error);
        }
    }, [sender_id,userToken]);





    useEffect(() => {
        setFriendsData(data);
        if (sender_id) {
            fetchFriendsList();
            fetchrequest();
            // fetchFriendsList();
        }
    }, [data, sender_id, fetchFriendsList, fetchrequest]);

    return (
        <div className="raj_container">
            <div className="first-row">
                <div className='username usern_css ' ><h5>Friends Lists are</h5></div>
                
                    <div className="available-friend-list">
                        {friendsList.length === 0 ? <div>No Friends Available</div>
                            :
                            friendsList.map((details) => (
                                <div className='parent' key={details.id}>
                                    <img src={details.friend_gender == "male" ? MaleImg : LadyImg} className='circular-image' alt='username'></img>
                                    <div className='username' ><h5>{details.friend_name}</h5></div>
                                    <button type="button"
                                        className=" btn btn-danger delete_css deletePost_btn btn_css botton_class"
                                        onClick={() => handleRemoveFriendRequest(details.friend_id, sender_id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))
                        }

                    </div>
                

            </div>
            <div className="second-row">
                <div className="friend-list-container">
                    <h5>Request list are:</h5>
                    <div className="friend-list">
                        <div className="friend-list-scroll">
                        {reqData.length === 0 ? <div>No Data To Display</div>
                                :
                                reqData.map((data) => (
                                    <div className='parent' key={data.req_id}>
                                        <img src={data.RequestedFromUserGender == "male" ? MaleImg : LadyImg} className='circular-image' alt='username'></img>
                                        <div className='username' ><h5>{data.RequestedFromUserName} </h5></div>
                                        <button type="button"
                                            className="btn btn-primary margin-bottom-43 comment_btn btn_css botton_class"
                                            onClick={() => handleAcceptRequest(data.userId_RequestedFrom, data.RequestedFromUserName, data.RequestedFromUserGender, data.RequestedToUserGender
                                            )}>
                                            Accept
                                        </button>
                                        <button type="button"
                                            className=" btn btn-danger delete_css deletePost_btn btn_css botton_class"
                                            onClick={() => handleRejectRequest(data.userId_RequestedFrom, data.userId_RequestedTo
                                            )}>
                                            Reject
                                        </button>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <h5>Available Friends are</h5>
                    <div className="friend-list">
                        <div className="friend-list-scroll">
                        {
                                friendsData === null
                                    ? <div>No data to Display</div>
                                    :
                                    friendsData.map((details) => (
                                        <div className='parent' key={details.user_id}>
                                            <img src={details.user_gender === "male" ? MaleImg : LadyImg} className='circular-image' alt={details.user_name} />
                                            <div className='username'>
                                                <h5>{details.user_name}</h5>
                                            </div>
                                            <button type="button"
                                                className="btn btn-primary comment_btn btn_css botton_class"
                                                onClick={() => handleAddFriend(details.user_id, details.user_name)}>
                                                 +Add Friend
                                            </button>
                                        </div>
                                    ))
                            }




                            {/* Add more friends here */}

                        </div>
                    </div>
                    {/* Add request list here */}
                </div>
            </div>
        </div>
    );
}

export default FriendContainer;
