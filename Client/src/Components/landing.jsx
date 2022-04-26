import { Link } from "react-router-dom"
import './landing.css'



export default function Landing(){
   
    return (
        <div className="landing">
            <h1> Welcome to the money register app </h1>
            <span className="span"> Do you have an account: </span>
            <Link to= './login'> <button className="button">Login </button>  </Link> 
            <br/> <br/>
            <span className="span"> Do you want to register </span>
            <Link to = './register'> <button className="button"> Register </button></Link>
        </div>
    )
}