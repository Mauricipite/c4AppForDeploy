import axios from 'axios'

const API_URL = 'api/computers'
const API_URL2 = 'api/computers/inventory'

//Create new Computer
const createComputer = async (computerData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.post(API_URL, computerData, config)

    return response.data
}

//Get computers
const getAllComputers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

//Get ONLY AVAILABLE computers
const getAvailableComputers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL2, config)

    return response.data
}


// Delete Computer from inventory
const deleteComputer = async (computerId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + computerId, config)
  
    return response.data
}

const computerService = {
    createComputer,
    getAllComputers,
    getAvailableComputers,
    deleteComputer,
}

export default computerService
