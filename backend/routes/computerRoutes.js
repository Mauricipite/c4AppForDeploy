const express = require('express')
const router = express.Router()
const { 
    getComputers, 
    insertComputers, 
    updateComputer, 
    deleteComputer,
    getAvailableComputers,
} = require('../controllers/computerController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getComputers)

router.get('/inventory', protect, getAvailableComputers)

router.post('/', protect, insertComputers)

router.put('/:id', protect, updateComputer)

router.delete('/:id', protect, deleteComputer)


module.exports = router