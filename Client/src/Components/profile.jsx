import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import InputProfile from "./InputProfile"


export default function Profile(){
    const navigate = useNavigate()
    const { id } = useParams()
    const [result, setResult] = useState('')

    const [edit, setEdit] = useState(false)
    
        useEffect(async ()=> {
            let results = await axios.get(`http://localhost:3001/${id}`)
            setResult(results.data)
        }, [])
         const [amount, setAmount] = useState(0)
         const handleSelecAmount = (e)=> {
           setAmount(Number(e.target.value)) 
        }
        const [type, setType]= useState('negative')
        const handleSelectType = (e)=> {
            console.log(type)
            setType(e)
        }
        
        const [movement, setMovement]= useState({type: type, date: Date(), amount: amount, id: id})
        const handleChargeMovement = (e)=> {
            setMovement({  
                ...movement, 
                [e.target.name]: (e.target.value)
            })           
        }
        const handleSubmitMovement = async()=> {
            // if(movement.type === 'negative'){
                setMovement(movement.amount)
            // }
            console.log(movement)
           await axios.post('http://localhost:3001/movement', movement)
            alert('The database has been uploaded')
            window.location.reload()
        }
   
        
    if(result.userMovements && result.userMovements[0]){
        let amounts = result.userMovements.map(x=>  Number(x.amount))
        var totalAmount = amounts.reduce((acc, el)=> acc + el)
        
    }
    console.log(result.userMovements)
    let contador = 1 
    return (
        <div>
     {result ? 
     <h1> Welcome {result.userData.name} </h1> : <h1>Loading...</h1>}    
           
         <h3>Your past movements:</h3> {             
             result.userMovements ? 
                result.userMovements.map(x=> {
                    return <div>
                        <span> {contador++}:
                        <InputProfile 
                        date={x.date.slice(4,15)}
                        concept={x.concept}
                        amount={x.amount}
                        id={x.id}
                        type={x.type} />
                        

                         {/* {x.date.slice(4, 15)} <b>{ x.concept }</b> $ {x.amount}  */}
                          </span>
                       
                    </div>
                    
                }) : <span> You do not have movements yet </span>
            }  
       {result.userMovements ? <h3>$ {totalAmount} </h3> : null}
            <div>
                <h2> Create a new movement </h2>
                <h6> Concept </h6>
                <input placeholder="Concept" name='concept' type='text' onChange={e=> handleChargeMovement(e)} />
                <h6> Amount $</h6>
                <input placeholder="Amount" name='amount' type='number' min='0' onChange={e=> handleChargeMovement(e)}/>
                <select name="type" defaultValue='positive' onChange={e=> handleChargeMovement(e)}>
                    <option value='negative'> Select your option </option>
                    <option value="negative">Negative</option>
                    <option value="positive">Positive</option>                    
                </select>
                <button onClick={()=> handleSubmitMovement()}> Submit Movement </button>
            </div>
      
      <button onClick={()=> navigate('/')}> Sign off </button> 
        </div>
    )
}