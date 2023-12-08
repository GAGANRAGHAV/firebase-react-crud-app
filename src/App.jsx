
import { useState,useEffect } from 'react'
import './App.css'
import {db} from "./firebase-config";
import {collection , getDocs , addDoc} from "firebase/firestore";

function App() {

  const [newName ,setNewName] = useState("");

  const [newAge , setNewAge] =useState(0)
  const [users ,setUsers] = useState([]);
  const userCollectionRef = collection(db , "user")


  const createUser = async () => {

    await addDoc(userCollectionRef , {name : newName , age: newAge});


  };



  useEffect(()=> {

    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      console.log(data);

      setUsers(data.docs.map((doc) => ({...doc.data() , id: doc.id})));

    };
    getUsers();

  }, [])

  return (
    <>
    <input placeholder='Name...' 
    
    onChange={(event) => {setNewName(event.target.value);
    }}
    />
    <input placeholder='Age...'
    
    onChange={(event) => {setNewAge(event.target.value);
    }}/>

    <button onClick={createUser}>Create User</button>

    {users.map((user) => {
      return (
        <div >
          {" "}
          <h1>Name: {user.name}</h1>
          <h1>Age: {user.age}</h1>


        </div>
      )
    })}
      
    </>
  )
}

export default App
