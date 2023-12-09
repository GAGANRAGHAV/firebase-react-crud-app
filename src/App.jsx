
import { useState,useEffect } from 'react'
import './App.css'
import {db} from "./firebase-config";
import {collection , getDocs , addDoc , updateDoc ,deleteDoc,doc} from "firebase/firestore";

function App() {

  const [newName ,setNewName] = useState("");

  const [newAge , setNewAge] =useState(0)
  const [users ,setUsers] = useState([]);
  const userCollectionRef = collection(db , "user")

  
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "user", id));
  };

  // await deleteDoc(doc(db, "users", "DC"));

  const updateUser = async (id, age) => {
    await updateDoc(doc(db, "user", id), {age: age + 1});
  };


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

        
        <div key={user.age} >
          {" "}
          <h1>Name: {user.name}</h1>
          <h1>Age: {user.age}</h1>

          <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              {" "}
              Increase Age
            </button>

            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </button>

        </div>
      )
    })}


    
      
    </>
  )
}

export default App
