import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Login() {
    const [credentials, setcredentials] = useState({ email: "", password: "" });

    let navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });

        const responseJSON = await response.json();
        console.log(responseJSON);

        if (!responseJSON.success) {
            alert("Enter Valid Credentials");
        }
        else if (responseJSON.success) {
            navigate('/');
        }
    };

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    };
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='m-3 container'>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/createuser" className="m-3">New User? Create Account</Link>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
