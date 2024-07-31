const Service = require("../models/service-model")

const services = async(req,res)=>{
    try {
        const response = await Service.find()
        if(!response){
            res.status(400).json({msg:"no service found"})
            return
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(`services:${error}`);
    }
}

module.exports = services