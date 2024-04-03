import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import TextField from "@mui/material/TextField";
import { db } from "./firebase-config";
import Navbar from "./Navbar";
import { collection, addDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import { v4 } from "uuid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase-config";
import './Blog.css'

const Blog = () => {
  const editor = useRef(null);
  const [newName, setNewName] = useState("");
  const [content, setContent] = useState("");
  const userCollectionRef = collection(db, "user");
  const [image, setImage] = useState(null); // State to store selected image
  const navigate = useNavigate();


  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Check if either heading or content is empty, then show a toast notification and return without submitting
    if (!newName.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
  
    let imageURL = ""; // URL to store in Firestore
    if (image) {
      const imageRef = ref(storage, `images/${image.name + v4()}`);
      await uploadBytes(imageRef, image).then(async (snapshot) => {
        // Upload image and get download URL
        imageURL = await getDownloadURL(snapshot.ref);
        console.log(imageURL); // Check if imageURL is correctly obtained
      }).catch(error => {
        console.error("Error uploading image:", error);
      });
    }
  
    // Check if imageURL is empty, if it is, then display an error message and return without adding the document
    if (!imageURL) {
      toast.error("Error uploading image. Please try again.");
      return;
    }
  
    // Add document to Firestore with the imageURL
    const docRef = await addDoc(userCollectionRef, {
      name: newName,
      age: content,
      image: imageURL,
    });
    const newPostId = docRef.id;
    console.log(newPostId);
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

        <div className="image">
          <input
            className="input-des"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "10px" }}
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
