const {Router}=require('express')

const productsController=require('./controllers/productsController')

const router = Router(); 

router.use('/products', productsController)

module.exports=router