const { Router } = require('express')
const PharmacyProduct = require('../schemas/PharmacyProduct')

const router = Router()

router.get("/:retailCompany", async (req, res) => {
    let allData = await PharmacyProduct.find({ retailCompany: req.params.retailCompany, track: true },{
        "productId":1,
        "track":1,
        "image":1,
        "title":1,
        "prices":1,
        "link":1,
        "manufacturer":1,
        "matchedProducts":1
    })

    let readyForUseData = JSON.parse(JSON.stringify(allData))

    let resultArray = []

    for (let index = 0; index < readyForUseData.length; index++) {
        const el = readyForUseData[index];
        el.id = el._id

        el.regularPrice = el.prices.regularPrice
        el.discountPrice = el.prices.discountPrice

        if (el.image === "IMAGE IS MISSING") {
            el.image = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
        } else {
            el.image = el.image.replace(".", "https://epharma.bg")
        }

        let targetMatchedProducts = el.matchedProducts
        targetMatchedProducts = el.matchedProducts.filter(el => el.track === true)

        for (let index = 0; index < targetMatchedProducts.length; index++) {
            const element = targetMatchedProducts[index];

            let elData = await PharmacyProduct.find(
                { _id: element.matchedProductId },
                { 
                    "productId": 1,
                    "image":1,
                    "title":1,
                    "prices":1,
                    "link":1,
                    "manufacturer":1,
                    "retailCompany":1 
                },
            )

            let result = JSON.stringify(elData[0])
            let targetObj = JSON.parse(result)

            for (const key in targetObj) {
                if(key !== "_id"){
                    if(key === "prices"){
                        el[`${element.retailCompany} - regularPrice`] = targetObj[key].regularPrice
                        el[`${element.retailCompany} - discountPrice`] = targetObj[key].discountPrice
                    }else {
                        el[`${element.retailCompany} - ${key}`] = targetObj[key]
                    }
                }
            }
        }
        resultArray.push(el)
    }

    res.json(resultArray)
})

module.exports = router