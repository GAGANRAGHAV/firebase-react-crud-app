import { NavLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';

import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='navit'>
      <Toolbar  className="navi"sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <div className="">
        
       
        <Typography
          component="h1"
          variant=""
          color="inherit"
          align="center"
          noWrap
          // sx={{ flex: .7 }}
        >

          <NavLink to="/"  className="abc">RaghavBlog</NavLink>
          
        </Typography>
      </div>

        


<div className="">

<IconButton>
          <GitHubIcon/>
      
        </IconButton>
        
        <IconButton>
          <TwitterIcon/>
      
        </IconButton>
        <IconButton>
          <LinkedInIcon/>
      
        </IconButton>
        

        <Button variant="contained">

        <NavLink to="/blog" className="def">BLOG</NavLink>

        </Button>


</div>
       

          
      </Toolbar>
       
       
    </div>
  )
}

export default Navbar