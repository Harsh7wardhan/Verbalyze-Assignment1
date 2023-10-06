import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, get } from 'firebase/database';
import { useState, useEffect } from 'react';
import './Home.css'; 
    
function Home() {

    const history = useNavigate();
    const [userData, setUserData] = useState(null);
    const [dbData, setdbData] = useState("")
    // const[name,setname] = useState("")

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const user = auth.currentUser;
        if (user) {
            const database = getDatabase();
            const userUid = user.uid;
            console.log("uid", userUid)
            const dbRef = ref(database, 'harshform');
            try {
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    console.log('User data:', data);
                    const users = Object.keys(data).map(key => {
                        return {
                            id: key,
                            ...data[key]
                        };
                    });
                    console.log("users", users)
                    setdbData(users)
                    // const lastUser = users[users.length - 1];

                    // // Access the values stored in the last index
                    // const lastUserEmail = lastUser.email;
                    // const lastUserFirstName = lastUser.fName;

                    // console.log("Last User Email:", lastUserEmail);
                    // console.log("Last User First Name:", lastUserFirstName);

                    // setEmail(lastUserEmail);
                    // setname(lastUserFirstName);

                    setUserData(data);
                } else {
                    console.log('No data available for the user');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    const handleSignOut = () => {
        signOut(auth).then(val => {
            console.log(val, "val")
            history('/');
        })
    }
    return (
        <div className="container">
            <h1 className='heading'>Welcome!</h1>
            <p>Here are all the registered users !</p>
            <div className="userList">
                {dbData && dbData.map((user) => (
                    <div key={user.id} className="userItem">
                        <p>User ID: {user.id}</p>
                        <p>Email: {user.email}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleSignOut} className='signout-button'>SIGN OUT</button>
        </div>
    )
}

export default Home
