import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
        <header>
      <nav>
        <ul>

          <li>
          <NavLink to="/">HOME</NavLink></li>
          <li>
          <NavLink to="/about">ABOUT</NavLink>
          </li>
          <li>
          <NavLink to="/contact">CONTACT</NavLink>

          </li>

        </ul>
      </nav>
    </header>
    </div>
  )
}

export default Navbar