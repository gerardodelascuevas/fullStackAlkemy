import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import './inputProfile.css'

export default function InputProfile({id, date, concept, amount, type }){

    const [edit, setEdit] = useState(false)

    const [theType, setTheType] = useState(type)

    const [movement, setMovement] = useState({
    id: id,
    date: date,
    concept: concept, 
    amount: amount,
    type: theType,    
})
    const handleEditMovement = (e)=> {
        setMovement({
            ...movement, 
            [e.target.name]: (e.target.value), 
            type: theType
           
        })
    }

    const handleUpdateMovement = async()=> {
      
        await axios.put(`http://localhost:3001/editMovement`, movement)
        Swal.fire('The database is updated')
        window.location.reload()
    }
   
    if(type === 'negative') amount = '-' + amount

    const handleDeleteMovement = async()=> {
    
        let boolean = window.confirm('This action is permanent, are you sure?')
        if(boolean){             
            await axios.delete(`http://localhost:3001/${id}`)
             Swal.fire('database has been updated')
             window.location.reload()
        }       
    }

    return(
        <div>
            { !edit ? 
            <div>
            <span className="span"> {date} {concept} <span className={type === 'negative' ? 'neg' : 'pos'}>$ {amount} </span> {type} </span>    
            <button onClick={()=> setEdit(!edit)} className='button'> Edit your movement </button>
            </div> : 
            <div>
                <span> { date } </span>
                <input name='concept' type="text" placeholder={concept} onChange={e=> handleEditMovement(e)}/>
                <input name='amount' type="number" placeholder={amount} onChange={e=> handleEditMovement(e)} />
                <span> {type} </span>
                <button onClick={()=> handleDeleteMovement()} className='btn-error'> X </button>
                <button onClick={()=> handleUpdateMovement()} className='button'> Update Movement </button>
            </div>
        }
        </div>
    )

}