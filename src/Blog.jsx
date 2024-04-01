import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import TextField from "@mui/material/TextField";
import { db } from "./firebase-config";
import Navbar from "./Navbar";
import { collection, addDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blog = () => {
  const editor = useRef(null);
  const [newName, setNewName] = useState("");
  const [content, setContent] = useState("");
  const userCollectionRef = collection(db, "user");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if either heading or content is empty, then show a toast notification and return without submitting
    if (!newName.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    

    const docRef = await addDoc(userCollectionRef, { name: newName, age: content });
    const newPostId = docRef.id;
    console.log(newPostId);
    // await addDoc(userCollectionRef, { name: newName, age: content });
    toast.success("Blog submitted successfully!"); // Display success toast
    // Delay navigation to give time for the toast to be displayed
    setTimeout(() => {
    navigate(`/blog/${newPostId}`);
    }, 2000); // Adjust the delay time as needed
  };

  return (
    <div>
      <Navbar />
      <ToastContainer /> {/* ToastContainer to display notifications */}

      <form onSubmit={handleSubmit}>
        <div className="head">
          <Typography variant="h2" className="head">
            Write a Blog !!
          </Typography>
        </div>

        <div className="heading">
          <TextField
            id="outlined-basic"
            label="Heading"
            variant="outlined"
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
        </div>

        <div className="content">
          <JoditEditor
            required
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => {}}
          />
        </div>

        <div className="succ">
          <Button type="submit" variant="contained" color="success">
            SUBMIT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Blog;
