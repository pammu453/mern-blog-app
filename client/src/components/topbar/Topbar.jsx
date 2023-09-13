import { useContext } from 'react';
import './topbar.css';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

const Topbar = () => {
    const {user,dispatch} = useContext(Context);

    const handlerLogout=()=>{
        dispatch({type:"LOGOUT"})
    }

    return (
        <div className='top'>
            <div className="topLeft">
               <h1>MYBlog</h1>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className='link' to="/">HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link className='link' to="/">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className='link' to="/">CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        <Link className='link' to="/write">WRITE</Link>
                    </li>
                    <li className="topListItem" onClick={handlerLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user ? (
                        // <img className='topImg' src={user.profilePic} alt="topImage" />
                        <div>@{user.username}</div>
                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className='link' to="/login">LOGIN</Link>
                            </li>
                            <li className="topListItem">
                                <Link className='link' to="/register">REGISTER</Link>
                            </li>
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default Topbar;
