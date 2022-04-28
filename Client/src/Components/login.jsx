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

       const [result, setResult] = useState('')

        const dispatched2 = async ()=>{
        const results = await axios.post(`http://localhost:3001/auth`, myUser)
        setResult(results.data)
    }

       useEffect(async ()=> {
    //         const results = await axios.post(`http://localhost:3001/auth`, myUser)
    //         setResult(results.data.result)
    //         // console.log(results)
               //result
        }, [])
   
        console.log('myUser', myUser)
        console.log('result', result)
   const dispatched = async ()=>{
        // const results = await axios.post(`http://localhost:3001/auth`, myUser)
        // setResult(results.data)
        await dispatched2()
    if(result.result){       
       navigate(`/${result.id}`)
     }
   else {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Try click again',
          })
   }
}
//console.log(result)

    return (
        <div className='login'>
            <h1 className='login_title'> Login </h1>
           <form className='form-container'>
               <input  placeholder="email ..." onChange={e=> handleUserName(e.target.value)}/> 
               <input type='password' placeholder="password ..."onChange={e=> handlePassword(e.target.value)}/> 
           </form>

           <button onClick={()=> dispatched()} className='button'> Entrar </button>

        </div>
    )
}