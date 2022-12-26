import express from "express"
import fetch from "node-fetch"
import con from '../seq-db.js'
import Credit from '../model/credit.js'
import Client from '../model/client.js'
import { where } from "sequelize"


const router = express.Router()

const annuite = (c, d, t)=>{

    let nc = parseInt(c)
    let nd = parseInt(d)
    let nt = parseInt(t)/100
    
    let tm = Math.pow(1+nt,1/12)-1
    let a = Math.pow(1+tm, nd)*tm*nc/(Math.pow(1+tm,nd)-1)

    return a
}

const capital = (a, d, t)=>{
    let na = parseInt(a)
    let nd = parseInt(d)
    let nt = parseInt(t)/100

    let tm = Math.pow(1+nt,1/12)-1
    let c = (na*(Math.pow(1+tm, nd)-1))/(Math.pow(1+tm,nd)*tm)

    return c
}

const duree = (c, a, t)=>{

    console.log(c, a, t)

    let nc = parseInt(c)
    let na = parseInt(a)
    let nt = parseInt(t)/100

    let tm = Math.pow(1+nt,1/12)-1
    let d = Math.log(na/(na-(tm*nc)))/Math.log(1+tm)
    
    // console.log(tm)
    // console.log(d)
    
    return Math.round(d)
}

router.post('/annuite',(req, res, next)=>{
    const {c, d, t} = req.body
    const result = annuite(c,d,t)
    console.log("request received")
    console.log("request:" + req)
    console.log("response:"+result)
    res.send(JSON.stringify(result))
})

router.post('/capital',(req, res, next)=>{
    const {a, d, t} = req.body
    const result = capital(a,d,t)
    res.send(JSON.stringify(result))
})

router.post('/duree',(req, res, next)=>{
    const {c, a, t, username} = req.body
    const result = duree(c,a,t)

    console.log(result)
    console.log(username)
    res.send(JSON.stringify(result))
})

router.post('/annuiteSauv', async (req, res, next)=>{
    const {c, d, t, username} = req.body
    
    const nc = parseInt(c)
    const nd = parseInt(d)
    const nt = parseInt(t)

    const user = username.substring(1,username.length-1)

    console.log("username:"+ user)
    
    const annuiteResult = annuite(c, d, t)
    console.log("annuite Value:" + annuiteResult)
    try{
        const client = await Client.findOne({where:{NomCli:user}})

        if(client != null){
            
            const credit = await Credit.create({
                    DatCred: new Date().toDateString(),
                    MonCre: nc,
                    DurCre: nd,
                    TauCre: nt,
                    AnnCred: annuiteResult,
                    NumCli: client.dataValues.NumCli
                })
            // res.send({status: 1, data: "Credit Addded Successfully"})
            res.send(JSON.stringify(annuiteResult))
            // console.log(client.dataValues.NumCli)
            // console.log("Credit Added")
        }else{
            // console.log("Credit Not Added")
            res.send({status: 0, data: "User does not exist"})
        }
    }catch(err){ 
        console.log(err)
    }
})

router.post('/capitalSauv', async (req, res, next)=>{
    const {a, d, t, username} = req.body
    
    const na = parseInt(a)
    const nd = parseInt(d)
    const nt = parseInt(t)

    const user = username.substring(1,username.length-1)

    console.log("username:"+ user)
    
    const capitalResult = capital(a, d, t)
    console.log("dureeCredit Value:" + capitalResult)
    try{
        const client = await Client.findOne({where:{NomCli:user}})

        if(client != null){
            
            const credit = await Credit.create({
                    DatCred: new Date().toDateString(),
                    MonCre: capitalResult,
                    DurCre: nd,
                    TauCre: nt,
                    AnnCred: na,
                    NumCli: client.dataValues.NumCli
                })
            // res.send({status: 1, data: "Credit Addded Successfully"})
            res.send(JSON.stringify(capitalResult))
            // console.log(client.dataValues.NumCli)
            // console.log("Credit Added")
        }else{
            // console.log("Credit Not Added")
            res.send({status: 0, data: "User does not exist"})
        }
    }catch(err){ 
        console.log(err)
    }
})

router.post('/dureeSauv', async (req, res, next)=>{
    const {c, a, t, username} = req.body
    
    const nc = parseInt(c)
    const na = parseInt(a)
    const nt = parseInt(t)

    const user = username.substring(1,username.length-1)

    console.log("username:"+ user)
    
    const dureeCredit = duree(c, a, t)
    console.log("dureeCredit Value:" + dureeCredit)
    try{
        const client = await Client.findOne({where:{NomCli:user}})

        if(client != null){
            
            const credit = await Credit.create({
                    DatCred: new Date().toDateString(),
                    MonCre: nc,
                    DurCre: dureeCredit,
                    TauCre: nt,
                    AnnCred: na,
                    NumCli: client.dataValues.NumCli
                })
            // res.send({status: 1, data: "Credit Addded Successfully"})
            res.send(JSON.stringify(dureeCredit))
            // console.log(client.dataValues.NumCli)
            // console.log("Credit Added")
        }else{
            // console.log("Credit Not Added")
            res.send({status: 0, data: "User does not exist"})
        }
    }catch(err){ 
        console.log(err)
    }
})
export default router