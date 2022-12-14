const express = require('express')
const router = express.Router()
const { 
    getComputers, 
    insertComputers, 
    updateComputer, 
    deleteComputer,
} = require('../controllers/computerController')

router.get('/', getComputers)

router.post('/', insertComputers)

router.put('/:id', updateComputer)

router.delete('/:id', deleteComputer)

module.exports = router