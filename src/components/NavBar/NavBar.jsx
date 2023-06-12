import CartWidget from "../CartWidget/CartWidget"
import './NavBar.css'
import { NavLink, Link } from "react-router-dom"

const NavBar = () => {
  const logoChilectra = "../img/logoChilectras.png";
  return (
    <>
    <header>
      <Link to={"/"}>
        <img className="logoChilectra" src={logoChilectra} alt="logo Chilectras" />
      </Link>

      <nav>
        <ul>
          <li>
            <NavLink className="miBtnnav" activeClassName="active" to={`/categoria/2`}> LUCES </NavLink>
          </li>
          <li>
            <NavLink className="miBtnnav" activeClassName="active" to={`/categoria/3`}> BATERÍAS </NavLink>
          </li>
          <li>
            <NavLink className="miBtnnav" activeClassName="active" to={`/categoria/1`}> CÁMARAS </NavLink>
          </li>
          <li>
            <NavLink className="miBtnnav" activeClassName="active" to={`/categoria/4`}> SENSORES </NavLink>
          </li>

        </ul>
      </nav>

      <CartWidget />

    </header>

    </>
  )
}

export default NavBar