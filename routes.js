const {Router}=require('express')

const allProductsController=require('./controllers/allProductsController')
const trackedProductsController=require('./controllers/trackedProductsController')

const router = Router(); 

router.use('/all-products', allProductsController)
router.use('/tracked-products',trackedProductsController)

module.exports=router