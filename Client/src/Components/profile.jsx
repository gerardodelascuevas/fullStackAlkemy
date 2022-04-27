import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import InputProfile from "./InputProfile"
import './profile.css'
import Pagination from "./Pagination"


export default function Profile(){
    const navigate = useNavigate()
    const { id } = useParams()
    const [result, setResult] = useState('')
    
        useEffect(async ()=> {
            let results = await axios.get(`http://localhost:3001/${id}`)
            setResult(results.data)
        }, [])
        
    if(result.userMovements && result.userMovements[0]){
        let neg = []
        let pos = []
        result.userMovements.forEach(x=> x.type === 'negative' ? neg.push(Number(x.amount)) : null )
        result.userMovements.forEach(x=> x.type === 'positive' ? pos.push(Number(x.amount)) : null )
        let posResult = pos.reduce((acc, el) => acc + el, 0)
        let negResult = neg.reduce((acc, el)=> acc + el, 0)
        var totalAmount = posResult - negResult   
        
    }
   
    let userMovementForShow = result.userMovements
    const [myType, setMyType] = useState('all')
    const handleFilterResult = (e)=> {
        setMyType(e)
    }

        myType === 'all' ?  userMovementForShow = userMovementForShow : 
        userMovementForShow = result.userMovements.filter(x=> x.type === myType)
       
    console.log(userMovementForShow)
    let contador = 1 

    //PAGINATION 
    const [pages, setPages] = useState(1)
    const movPerPage = 10

    let lastMovement = pages * movPerPage
    let firstMovement = lastMovement - movPerPage
    if(userMovementForShow){
        var currentMoves = userMovementForShow.slice(firstMovement, lastMovement)        
    }
    const pagination = number=> setPages(number)
    

    return (
        <div className="profile">
             <button onClick={()=> navigate('./movementCreate')} className='button'>Create a new Movement </button>
      
      <button onClick={()=> navigate('/')} className='button'> Sign off </button> 
     {result ? 
     <h1> Welcome {result.userData.name} </h1> : <h1>Loading...</h1>}    
     <select onChange={(e)=> handleFilterResult(e.target.value)}>
         <option value='all'> Select the amount type </option>
         <option value='positive'> Positive </option>
         <option value='negative'> Negative </option>
     </select>

     <Pagination 
       allMovement = {userMovementForShow ? userMovementForShow.length : 1}
       movpp = { movPerPage }
       pagination = { pagination }
       />
           
         <h3>Your past movements:</h3> { 
                 
             currentMoves ? 
        
            currentMoves.map(x=> {
                    return <div>
                        <span> {contador++}: </span>
                        <InputProfile 
                        date= { x.date.slice(4,15) }
                        concept= { x.concept }
                        amount= { x.amount } 
                        id= { x.id }
                        type= { x.type } />

                    </div>
                    
                }) : <span> You do not have movements yet </span>
            }  
       { result.userMovements ? <h3> Your Balance is: <span className={totalAmount < 0 ? 'neg' : 'pos'}> $ {totalAmount} </span></h3> : null}
           
        </div>
    )
}