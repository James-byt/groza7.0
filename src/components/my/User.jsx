import React, { useState } from "react";
//import axios from "axios";
//import bcrypt from "bcryptjs";
//import jwt from "jsonwebtoken";
import firebase from "firebase/app";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs ,query, where,} from "firebase/firestore";
import { useEffect } from 'react';
import "./user.css";


const firebaseConfig = {
  apiKey: "AIzaSyD7lYb371PBcaSFp5nRa0F5J7uYYbZcf8E",
  authDomain: "simpledb-47ee8.firebaseapp.com",
  databaseURL: "https://simpledb-47ee8-default-rtdb.firebaseio.com",
  projectId: "simpledb-47ee8",
  storageBucket: "simpledb-47ee8.appspot.com",
  messagingSenderId: "1005568739956",
  appId: "1:1005568739956:web:3a9e0f5d1afb4e3db7df21",
  measurementId: "G-Z9BE1WQNYE"
};

//firebase.initializeApp(firebaseConfig);

//////////

const apps = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(apps);

const db = getFirestore(apps);

///////

///////////






const Register = (props) => {
  const [email, setEmail ] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  {/*
  const handleSubmit = async (e) => {
    e.preventDefault();

  
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  */}

    const handleSubmit = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, 
        props.email,
        password,)
       /* .then((userCredential) => {
          // get the user's unique ID
          const userID = userCredential.user.uid;
  
          // create a new user node in the database
          firebase.database().ref('users/' + userID).set({
            phoneNumber: phoneNumber,
            address: {
              line1: addressLine1,
              line2: addressLine2
            },
            email: email
          });
        })  */
/////// //////// ///////// /////
      
      .then((res) => {
        console.log("User created successfully", res);
      }) 
      .catch((error) => {
        console.error("Error creating user", error);
      });

      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: email,
          password: password,
          phone: phoneNumber,
          address1: addressLine1,
         address2: addressLine2,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');

      if (email) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }

  /*

/*
    const usersRef = ref(db, 'users');
    const newUser = {
      email: email,
      password: password,
      phone: phoneNumber,
      address1: addressLine1,
      address2: addressLine2,
    };
    push(usersRef, newUser);
 

    try {
      const { data } = await axios.post("/api/register", {
        email,
        password: hashedPassword,
        phone,
        adress1,
        adress2,
      });
      console.log("User created successfully", data);
    } catch (error) {
      console.error("Error creating user", error);
    }  */


  };

  return (
    <form onSubmit={handleSubmit} className='logform' >
       <label className="loglabel">
        Email:
        <input className="loginput"  type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label  className="loglabel" >
        Password:
        <input  className="loginput" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label   >
      <label  className="loglabel" >
        Phone number:
        <input   className="loginput"  type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      </label  >
      <label  className="loglabel" >
        Address line 1:
        <input  className="loginput" type="text" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} />
      </label>
      <label   className="loglabel" >
        Address line 2:
        <input  className="loginput" type="text" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};

const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  // const handleSubmit = async (e) => {
    // e.preventDefault();

 
 
 
    const handleSubmit = (e) => {

      //setLoggedIn(true);
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log("User logged in successfully", res);
        })
        .catch((error) => {
          console.error("Error logging in user", error);
        });
 
 
 
       


         // Perform login logic here and set isAuthenticated to true
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');



    
      if (email) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }

      window.location.reload();

    /*
  
    try {
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });

      // Verify the password using bcrypt
      const isMatch = await bcrypt.compare(password, data.password);
      if (!isMatch) {
        console.error("Invalid credentials");
        return;
      }

      // Generate a JSON Web Token
      const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET);
      console.log("User logged in successfully", token);
    } catch (error) {
      console.error("Error logging in user", error);
    }  */
  };

  return (
    <form onSubmit={handleSubmit}  className="logform" > 
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="btn-container loginput"
       
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="loginput"
      />
      <button type="submit" className='buttons' >Login</button>
    </form>
  );
};


const User = (props) => {
  //const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [email, setEmail] = useState({});
  const [email, setEmail ] = useState(localStorage.getItem("email") || "");
  
  //const email = "gacadap370@otanhome.com";
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  }, [email]);

  useEffect(() => {

   
    const getUser = async () => {
      const userRef = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(userRef);
      querySnapshot.forEach((doc) => {
        const { phone, password } = doc.data();
        setUser({ id: doc.id, phone, password });
      });
    };

    getUser();


    // Check local storage for the user's authentication status
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
    setUserDetails({
      orderHistory: [{orderId: 1234, date: "2023-02-15", status: "Delivered"}, {orderId: 5678, date: "2023-02-12", status: "In transit"}]
    });

    
  



  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem("email");
    window.location.reload();
  }
  

if (!user) {
  return <div> 
  <Register  />
  <Login />
</div>
}

  return (
    
      <div>
      {isAuthenticated ? (
        <div className='user-details-container'>
          <h1  className="userhd" >Welcome, {user.phone}!</h1>
          <p>Email: {user.password}</p>

          <h2>Order History:</h2>
          <ul>
            {userDetails.orderHistory.map((order) => (
              <li key={order.orderId}>
                Order ID: {order.orderId}<br />
                Date: {order.date}<br />
                Status: {order.status}
              </li>
            ))}
          </ul>

          <button type="submit" onClick={handleLogout} className='buttons'>LogOut</button>

        </div>
      ) : (
      <div>
      <Register  />
      <Login />



      </div>
      )}
    </div>
  );
};

export default User;