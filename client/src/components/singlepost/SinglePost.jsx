import { useContext, useEffect, useState } from 'react';
import './singlepost.css';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

const SinglePost = () => {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = 'http://localhost:5000/imges/';
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] =useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data)
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        data: { username: user.username }, // Pass username in the request body
      });
      window.location.replace("/");
    } catch (error) {
      alert("Unable to Delete...!");
    }
  };

  const handleUpdate=async()=>{
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        username:user.username,
        title,
        desc
      });
      window.location.reload();
    } catch (error) {
      alert("Unable to Update...!");
    }
  }


  return (
    <div className='singlePost'>
      <div className="singlePostWrapper">
        {
          post.photo && (
            <img className='singlePostImage' src={PF + post.photo} alt="" />
          )
        }

        {
          updateMode ? <input type="text" value={title} className='singlePostTitleInput' autoFocus={true} onChange={e=>setTitle(e.target.value)}/> : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                  <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                </div>
              )}
            </h1>
          )
        }
        <div className="singlePostInfo">
          <span className='singlePostAuther'>
            Author :
            <Link to={`/?user=${post.username}`} className='link'>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {
          updateMode ? <textarea className='singlePostDescInput' value={desc} onChange={e=>setDesc(e.target.value)}/> :(
            <p className='singlePostDesc'>{desc}</p>
          )
        }
        {
          updateMode && <button className='singlepostButton' onClick={handleUpdate}>Update</button>
        }
      </div>
    </div>
  )
}

export default SinglePost;
