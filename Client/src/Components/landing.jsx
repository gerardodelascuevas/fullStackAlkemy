import { Link } from "react-router-dom";



export default function Landing(){
   
    return (
        <div>
            <h1> Welcome to the money register app </h1>
            <span> Do you have an account: </span>
            <Link to= './login'> <button>Login </button>  </Link> 
            <br/> <br/>
            <span> Do you want to register </span>
            <Link to = './register'> <button> Register </button></Link>
        </div>
    )
}