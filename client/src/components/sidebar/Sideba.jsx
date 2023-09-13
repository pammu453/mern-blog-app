import { useEffect, useState } from 'react';
import './sidebar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sideba = () => {
  const [cat, setCat] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:5000/api/cat");
      setCat(res.data);
    }
    getCats();
  }, [])
  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="https://images.pexels.com/photos/5997996/pexels-photo-5997996.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        <p>This is the website for creating a blogs of user interest and you can create any category website</p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {
            cat.map((c) => (
              <Link to={`/?cat=${c.name}`} className='link'>
                <li className="sidebarListItem">{c.name}</li>
              </Link>
            ))
          }
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook"></i>
          <i className="sidebarIcon fa-brands fa-twitter"></i>
          <i className="sidebarIcon fa-brands fa-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>

    </div>
  )
}

export default Sideba;
