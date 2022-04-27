import { useState } from "react"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"


export default function CreateMovement(){
    const navigate = useNavigate()
    const { id } = useParams()

    const [movement, setMovement]= useState({ type: null, date: Date(), amount: null, id: id })
    const handleChargeMovement = (e)=> {
        setMovement({  
            ...movement, 
            [e.target.name]: (e.target.value)
        })           
    }

         const handleSubmitMovement = async()=> {
           setMovement(movement)
           await axios.post('http://localhost:3001/movement', movement)
          
            alert('The database has been uploaded')
            navigate(`../${id}`)        
            //window.location.reload()
        }
       
    return (    
    <div>
        <div>
                    <h2> Create a new movement </h2>
                    <h6> Concept </h6>
                    <input placeholder="Concept" name='concept' type='text' onChange={e=> handleChargeMovement(e)} />
                    <h6> Amount $</h6>
                    <input placeholder="Amount" name='amount' type='number' min='0' onChange={e=> handleChargeMovement(e)}/>
       
                    <form onChange={e=> handleChargeMovement(e)}> 
                        <input type="radio" id="positive" name="type" value="positive"/>
                        <label htmlFor="positive">Positive</label>
                        <input type="radio" id="negative" name="type" value="negative"/>
                        <label htmlFor="negative">Negative</label>
                        
                    </form>
                

                    <button onClick={()=> handleSubmitMovement()} className='button'
                        disabled={!movement.amount || !movement.type || !movement.concept}
                    > Submit Movement </button>
                </div>
        <Link to='../../'>
         <button className='button'> Sign off </button>
        </Link>
    </div>
      )  
}