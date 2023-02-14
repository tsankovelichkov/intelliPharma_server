const {Router}=require('express')
const PharmacyProduct = require('../schemas/PharmacyProduct')

const router=Router()

router.get("/highest-price-devaiton",async (req,res)=>{
    let allData = await PharmacyProduct.find({ retailCompany: "BENU" })

    res.json(allData)
})

module.exports = router