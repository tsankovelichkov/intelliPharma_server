const { Router } = require('express')
const PharmacyProduct = require('../schemas/PharmacyProduct')

const router = Router()

router.get("/:retailCompany", async (req, res) => {
    let allData = await PharmacyProduct.find({ retailCompany: req.params.retailCompany })

    let readyForUseData = JSON.parse(JSON.stringify(allData))

    readyForUseData.map(el => {

        el.id = el._id
        el.regularPrice = el.prices.regularPrice
        el.discountPrice = el.prices.discountPrice

        if (el.image === "IMAGE IS MISSING") {
            el.image = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
        } else {
            el.image = el.image.replace(".", "https://epharma.bg")
        }

        if (el.retailCompany === "EPHARMA") {
            el.retailCompanyLogo = "https://epharma.bg/templates/default/images/logo.png"
        }
    })

    res.json(readyForUseData)
})

router.get("/:retailCompany/:productId", async (req, res) => {
    let allData = await PharmacyProduct.find({ _id: req.params.productId, retailCompany: req.params.retailCompany })

    let readyForUseData = JSON.parse(JSON.stringify(allData))

    readyForUseData.map(el => {

        el.id = el._id
        el.regularPrice = el.prices.regularPrice

        if (el.prices.discountPrice > 0) {
            el.discountPrice = el.prices.discountPrice
        }

        if (el.image === "IMAGE IS MISSING") {
            el.image = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
        } else {
            el.image = el.image.replace(".", "https://epharma.bg")
        }

        if (el.retailCompany === "EPHARMA") {
            el.retailCompanyLogo = "https://epharma.bg/templates/default/images/logo.png"
        }
    })

    res.json(readyForUseData)
})

router.put("/:productId/update", (req, res) => {
    let updateData = req.body;

    PharmacyProduct.findByIdAndUpdate(req.params.productId, updateData)
        .then(response => res.json({ updated: true }))
        .catch(err => res.json({ updated: false }))
})

router.get("/:retailCompany/matched-products/:productId", async (req, res) => {
    let productData = await PharmacyProduct.find({ _id: req.params.productId, retailCompany: req.params.retailCompany })

    let readyForUseData = JSON.parse(JSON.stringify(productData))
    let resultArray = []

    for (let index = 0; index < readyForUseData[0].matchedProducts.length; index++) {
        const el = readyForUseData[0].matchedProducts[index]

        let elData = await PharmacyProduct.find({ _id: el.matchedProductId })
        let elObj = JSON.parse(JSON.stringify(elData))

        elObj[0].id = elObj[0]._id
        elObj[0].regularPrice = elObj[0].prices.regularPrice

        if (elObj[0].prices.discountPrice > 0) {
            elObj[0].discountPrice = elObj[0].prices.discountPrice
        }

        if (elObj[0].image === "IMAGE IS MISSING") {
            elObj[0].image = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
        }

        if (readyForUseData[0].matchedProducts[index].track === undefined) {
            elObj[0].track = false
        } else {
            if (readyForUseData[0].matchedProducts[index].track) {
                elObj[0].track = true
            } else {
                elObj[0].track = false
            }
        }

        resultArray.push(elObj[0])

    }


    res.json(resultArray)
})

router.put("/:retailCompany/matched-products/:productId/update", async (req, res) => {

    let isTracked = false

    let track = req.body.track === "true" ? true : false

    if (track) {
        let productData = await PharmacyProduct.find({ _id: req.params.productId })

        let readyForUseData = JSON.parse(JSON.stringify(productData))[0]

        isTracked = false


        readyForUseData.matchedProducts.forEach(obj => {
            if (obj.track && obj.retailCompany === req.body.retailCompany) {
                isTracked = true
            }
        })
    }

    if (!isTracked) {

        PharmacyProduct.findOneAndUpdate(
            {
                "_id": `${req.params.productId}`,
                "retailCompany": `${req.params.retailCompany}`,
                "matchedProducts.matchedProductId": `${req.body.id}`
            },
            { "$set": { "matchedProducts.$.track": `${track}` } }
        ).then(response => res.json({ updated: true }))
            .catch(err => res.json({ updated: false }))
    } else {
        res.json({ 
            updated: false ,
            type:"ONLY-ONE-FROM-THE-SAME-RETAIL-COMPANY"
        })
    }
})

router.put("/:productId/update", (req, res) => {
    let updateData = req.body;
    
    PharmacyProduct.findByIdAndUpdate(req.params.productId, updateData)
        .then(response => res.json({ updated: true }))
        .catch(err => res.json({ updated: false }))
})


module.exports = router