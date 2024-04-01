import Navbar from './Navbar'
import {auth, provider} from "./firebase-config";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';




const About = ({setIsAuth}) => {

  let navigate = useNavigate();


  const signInWithGoogle = () => {
    signInWithPopup(auth,provider).then((result) => {
      localStorage.setItem("isAuth" , true);
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <div>

        <Navbar/>

        <button onClick={signInWithGoogle}>
          Sign in with google
        </button>
        
        </div>
  )
}

export default About