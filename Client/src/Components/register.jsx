import { useState } from "react"
import { useNavigate } from "react-router-dom"
 import axios from 'axios'
 import './register.css'
import Swal from "sweetalert2"


export default function Register(){
    const navigate = useNavigate()

    const [ user, setUser ] = useState({
        name: '',
        password: '',
    })

    const handleForm = (e)=> {
        setUser({
           ...user,
            [e.target.name]: e.target.value
        })
    }

    const [pass, setPass] = useState('')

    const handleSecondPassword = (e)=> {
        setPass(e.target.value)
    }

    const checkPassword = async()=> {
        if(pass !== user.password){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please check your password again',
               
              })
        } else if(!user.email.includes('@')){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid email',               
              })
        }
        else {
           await postUser()
           await axios.post(`http://localhost:3001/auth`, user)
           .then(x=> navigate(`../${x.data.id}`))           
        }
    }

    const postUser = async ()=> {
        await axios.post(`http://localhost:3001/users`, user)
    }

    return (
        <div className="register">
            <h4> select your user name: </h4>
            <input type="text" name='name'placeholder="selec your userName" onChange={e=> handleForm(e)}/> <br/>
            <h4> select your email </h4>
            <input type="text" name='email' placeholder="type here your email" onChange={e=> handleForm(e)}/>
            <h4> select your password </h4>
            <input type='password'name = 'password'placeholder="select your password"onChange={e=> handleForm(e)} />
            <h4> Type your password again </h4>
            <input type='password' placeholder="select your password" onChange={e=> handleSecondPassword(e)}/>
            <button onClick={checkPassword} className='button'> Submit </button>
        </div>
    )
}   