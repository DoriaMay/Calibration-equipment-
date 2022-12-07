import React from 'react'
import { Link } from 'react-router-dom'

function Home(props) {
  return (
    <div>
        <div>
            <h2>
                <Link to="/login">Login</Link>
            </h2>
            <br />
            <h2>
                <Link to="/signup">Signup</Link>
            </h2>
        </div>
        <br />
        <br />
        <br />

        <h2>{props.first_name ? `welcome - ${props.first_name}`: "Login please"}</h2>
    </div>
  )
}

export default Home