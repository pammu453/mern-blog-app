import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const onSubmiteHandler = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username, password, email
            });
            { res.data && window.location.replace("/login") }
        } catch (error) {
            setError(true)
        }
    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={onSubmiteHandler}>
                <label>Username</label>
                <input type="text" placeholder="Enter your username..." value={username} onChange={e => setUsername(e.target.value)} />
                <label>Email</label>
                <input type="text" placeholder="Enter your email..." value={email} onChange={e => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Enter your password..." value={password} onChange={e => setPassword(e.target.value)} />
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link className='link' to="/login">Login</Link>
            </button>
            {error && <span style={{ color: "red", marginTop: "5px" }}>Something went Wrong</span>}
        </div>
    );
}

export default Register;
