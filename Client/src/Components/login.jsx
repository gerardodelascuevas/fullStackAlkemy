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

   const handlePassword = (e)=> {
       setPassword(e)
   }
   const myUser = {
       email: user, 
       password: password
   }
 
   const [result, setResult] = useState(0)
   const dispatched = async ()=>{
        const results = await axios.post(`http://localhost:3001/auth`, myUser)
        setResult(results.data)
    if(result.result){       
        console.log(result)
        navigate(`/${result.id}`)
     }
    else {
       Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Try click again',
          })
    }
    // axios.post(`http://localhost:3001/auth`, myUser)
    // .then(x=> {
    //     console.log(x)
    // })
}
console.log(result)

    return (
        <div className='login'>
           <form>
               <input  placeholder="email ..." onChange={e=> handleUserName(e.target.value)}/> 
               <input type='password' placeholder="password ..."onChange={e=> handlePassword(e.target.value)}/> 
           </form>

           <button onClick={()=> dispatched()}> Entrar </button>

        </div>
    )
}