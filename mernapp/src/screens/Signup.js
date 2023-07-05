import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Signup() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation,
            })
        });

        const responseJSON = await response.json();
        console.log(responseJSON);

        if (!responseJSON.success) {
            alert("Enter Valid Credentials");
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already A User? Login</Link>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
