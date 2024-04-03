import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';
import { Typography } from '@mui/material';
import Navbar from './Navbar';
import './SingleBlog.css'

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, 'user', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className='blog-wrap'>
        {blog ? (
          <div className='blog-cont'>
            <h2>{blog.name}</h2>
            <img src={blog.image} width={650} height={400} />
            <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: blog.age }}/>
            {/* Display other properties of the blog post */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
