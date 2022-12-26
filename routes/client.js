import express from "express"
import request from "request"
import fetch from "node-fetch"
import Client from "../model/client.js"
import con from '../database.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res, next)=>{
  const {username, password} = req.body;

  try{
    const existingClient = await Client.findAll({where:{NomCli: username}})
    if(!existingClient.length){
      const client = await Client.create({NomCli: username, PassCli:password})
      let token = jwt.sign({ data: existingClient }, 'secret')
      res.send({ status: 1, data: existingClient, token : token });
    }else{
      res.send({ status: 0, data: "User Exist"});
    }

  }catch(err){
    console.log(err)
  }
})

router.post('/login', async (req, res, next)=>{
  const {username, password } = req.body

  try{
    const client = await Client.findOne({where:{NomCli: username, PassCli: password}})
    if(client == null){
      res.send({status: 0, data: "User Not Found"})
    }else{
      let token = jwt.sign({ data: client}, 'secret')
      res.send({ status: 1, data: client, token: token });
    }

  }catch(err){
    console.log(err)
  }
})

// router.post('/register', async function (req, res, next) {
//   try {
//     let { username, password } = req.body; 
   
//     const checkUsername = `Select NomCli FROM tclient WHERE NomCli = ?`;

//     const result = await con.query(checkUsername, [username]);
//         console.log(result)
//       if(!result.length){
//         const sql = `Insert Into tclient (NomCli, PassCli) VALUES ( ?, ? )`
//         con.query(
//           sql, [username, password],
//         (err, result, fields) =>{
//           if(err){
//             res.send({ status: 0, data: err });
//           }else{
//             let token = jwt.sign({ data: result }, 'secret')
//             res.send({ status: 1, data: result, token : token });
//           }
         
//         })
//       }
    
   
//   } catch (error) {
//     res.send({ status: 0, error: error });
//   }
// });

// router.post('/login', async function (req, res, next) {
//     console.log("Log In Connection")
//   try {
//     let { username, password } = req.body; 
//     console.log(username, password)
//     const sql = `Select * FROM tclient WHERE NomCli = ? AND PassCli = ?`;
//     const result = await con.query(sql, [username, password])
//     console.log(result.length)
//       if(!result.length){
//         res.send({ status: 0, data: err });
//       }else{
//         let token = jwt.sign({ data: result }, 'secret')
//         res.send({ status: 1, data: result, token: token });
//       }
     
//     } catch (error) {
//     res.send({ status: 0, error: error });
//   }
// });

router.post('/table', async function (req, res, next) {
  try {
        let { username} = req.body; 
    console.log(username)
    const sql = `Select NumCli FROM tclient WHERE NomCli = ?`
    const numCli = await con.query(sql, [username])

    sql = `Select * FROM tcredit WHERE NumCli = ?`
    const result = await con.query(sql, [numCli])

    console.log(result.length.length)
      if(!result.length){
        res.send({ status: 0, data: err });
      }else{
        res.send({ status: 1, data: result, token: token });
      }
     
    } catch (error) {
    res.send({ status: 0, error: error });
  }
});


export default router