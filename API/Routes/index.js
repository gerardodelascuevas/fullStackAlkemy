const { Router } = require('express')
const axios = require('axios')
const  { Users, Movement } = require('../db')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
require('dotenv')
const router = Router()
const { Op } = require("sequelize")

const getMovementInfo = async ()=> {
    try {
        return await Users.findAll({
        include: [{
            model: Movement,
            attributes: ["date", "concept", "amount", "type"]
        }]
    })
    } catch (error) {
        console.log(error)
    }    
}
   
router.get('/home', async (req, res)=> {
    try {
      const theInfo = await getMovementInfo()
        res.send(theInfo)  
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/users', async (req, res)=> {
    let { name, password, email } = req.body
    try {    
    password = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    let newUser = await Users.create({
        name: name, 
        password: password,
        email: email
    })
    res.send(newUser) 

    } catch (error) {
        console.log(error)
        
    }
  
})

router.get('/users',async (req, res)=> {
    const users = await Users.findAll()
    try{
        res.send(users)
    } catch(e) { console.log(e) }
})

router.post('/movement', async (req, res)=> {
    const { date, concept, amount,  type, id } = req.body
    try {
       let newMovement = await Movement.create({
        date,
        concept,
        amount, 
        type })    

   let user = await Users.findOne( {
        where: {id: id}
    }) 
    
    //let myMovement = await Movement.findOne({
      //  where: {concept: newMovement.concept}
    //})
    await user.addMovement(newMovement)
    res.send(newMovement)  
    } catch (error) {
        console.log(error)
    }
  
   
})

router.post('/auth', async (req, res)=> {
    const { email, password } = req.body;
    try { 
        if(!email || !password) {
        return res.send("Email and password are required")
    }
     const user = await Users.findOne({
         where: { email: email }
     })

     if(user){
         const result = await bcrypt.compare(password, user.password)
         let response = {
            result: result, 
            id: user.id
         }
        res.send(response)
     } else {
         res.send({msg: "user not found"})
     }
        
    } catch (error) {
        console.log(error)
    }
   
   
   
})

router.get('/:id', async (req, res)=> {
    const { id } = req.params
    try {
       let user = await Users.findAll({
       include: [{
           model: Movement,
       }]
    }) 
    const theUser = await Users.findOne({
        where: { id: id }
    })
    if(user && theUser){
        user = user.find(x=> x.id === theUser.id).Movements
    } 
    const response = { 
        userMovements: user, 
        userData: theUser
    }
    res.send(response)
    } catch (error) {
        console.log(error)
    }
    
})

router.put('/editMovement', async(req, res)=> {
    const { id, amount, concept, type } = req.body
   try {
       Movement.update(
            { amount: amount, concept: concept, type: type, }, 
            { where: {id: id}   }
            ) 
             res.send('Database is updated')
        
   } catch (error) {
       console.log(error)
   }
             
})

router.delete('/:id', async(req, res)=> {
    const { id } = req.params
 
    if(id){
    await Movement.destroy({ 
        where: { id: id }
    })
    res.send('Movement deleted')
    } else {
        console.log('error en id')
        res.status(404)
    }
    
})
    



module.exports = router;