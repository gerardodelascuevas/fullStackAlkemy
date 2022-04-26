import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"

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

    // const handleSelectType = (e)=> {
    //     setTheType(e)
    //     setMovement({
    //         ...movement, 
    //         type: e
    //     })
    // }
    console.log(movement)

    const handleUpdateMovement = async()=> {
        console.log(movement)
        await axios.put(`http://localhost:3001/editMovement`, movement)
        alert('The database is updated')
        window.location.reload()
    }
    console.log(theType)
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
            <span> {date} {concept} $ {amount} {type} </span>    
            <button onClick={()=> setEdit(!edit)}> Edit your movement </button>
            </div> : 
            <div>
                <span> { date } </span>
                <input name='concept' type="text" placeholder="concept" onChange={e=> handleEditMovement(e)}/>
                <input name='amount' type="number" placeholder="amount" onChange={e=> handleEditMovement(e)} />
                <span> {type} </span>
                {/*<select name='type' onChange={e=> handleSelectType(e.target.value)}> 
                 <option value='negative' > Select your option </option>
                    <option value="negative">Negative</option>
                    <option value="positive">Positive</option>                  
                </select> */}
                <button onClick={()=> handleDeleteMovement()}> X </button>
                <button onClick={()=> handleUpdateMovement()}> Update Movement </button>
            </div>
        }
        </div>
    )

}