import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './login.css'

export default function  Login(){
    const navigate = useNavigate()


   const [user, setUser] = useState('')
   const [password, setPassword] = useState('')

   const handleUserName = (e)=> {
       setUser(e)
   }

   const handlePassword = async(e)=> {
       setPassword(e)
   }
   const myUser = {
       email: user, 
       password: password,
   }

       const [result, setResult] = useState({})
   

   const dispatched = async ()=>{
         const results = await axios.post(`http://localhost:3001/auth`, myUser)   
         setResult(results.data)
        
    if(await result.result){       
       navigate(`/${result.id}`)
     }
     else if(result.msg === 'user not found'){
        Swal.fire({
            icon: 'error',
            title: 'User not found',
            text: 'Check your data',
          })
     }   
   else {
        Swal.fire({
            icon: 'info',
            title: `Sorry, we don't capture your data or password incorrect`,
            text: 'Please try click again first or check your password',
          })
   }
}
 
    return (
        <div className='login'>
            <h1 className='login_title'> Login </h1>
           <form className='form-container'>
               <input  placeholder="email ..." onChange={e=> handleUserName(e.target.value)}/> 
               <input type='password' placeholder="password ..."onChange={e=> handlePassword(e.target.value)}/> 
           </form>

           <button onClick={()=> dispatched()} className='button'> Login </button>

        </div>
    )
}