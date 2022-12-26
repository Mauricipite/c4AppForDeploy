import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaLaptopCode } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import {getAllComputers, createComputer, reset} from '../features/computers/computerSlice'
import ComputerItemAdmin from '../components/ComputerItemAdmin'

//import { insertComputer, reset } from '../features/computers/computerSlice'

//import { register, reset } from '../features/auth/authSlice'
//insertComputers

function InventoryForm() {

    const [formData, setFormData] = useState({
        inventoryCode: '',
        description: '',
        cpu: '',
        ram: '',
        storage: '',
        category: ''
    })

    const {inventoryCode, description, cpu, ram, storage, category} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //PROLY PUT USER HERE
    //const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.auth)
    const {computers, isLoading, isError, isSuccess, message} = useSelector((state) => state.computers)

    useEffect(() => {
        if(!user) {
            navigate('/')
        }

        if(user.admin !== true) {
            navigate('/rent')
        }

        if(isError) {
            toast.error(message)
        }
  
        if(isSuccess) {
            navigate('/neww')
        }

        dispatch(getAllComputers())

        dispatch(reset())
    }, [user, computers, isError, isSuccess, message, navigate, dispatch])
    //PROLY PUT USER ONE LINE UP
    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
  
        const computerData = {
            inventoryCode,
            description,
            cpu,
            ram,
            storage,
            category
        }

        dispatch(createComputer(computerData))
    }

    if(isLoading) {
        return <Spinner/>
    }

    return  <>
      <section className='heading'>
          <h1>
              <FaLaptopCode/> Insert into inventory
          </h1>
          <p>PCs inventory</p>
      </section>

      <section className='form'>
          <form onSubmit={onSubmit}>
              {/*inventoryCode input*/}
              <div className="form-group">
                  <input
                      type='number'
                      className='form-control'
                      id='inventoryCode'
                      name='inventoryCode'
                      value={inventoryCode}
                      placeholder='Enter the inventory code for this PC'
                      onChange={onChange}
                  />
              </div>
              {/*description input*/}
              <div className="form-group">
                  <input
                      type='text'
                      className='form-control'
                      id='description'
                      name='description'
                      value={description}
                      placeholder='Enter a description'
                      onChange={onChange}
                  />
              </div>
              {/*cpu input*/}
              <div className="form-group">
                  <input
                      type='text'
                      className='form-control'
                      id='cpu'
                      name='cpu'
                      value={cpu}
                      placeholder='CPU on the PC'
                      onChange={onChange}
                  />
              </div>
              {/*ram input*/}
              <div className="form-group">
                  <input
                      type='text'
                      className='form-control'
                      id='ram'
                      name='ram'
                      value={ram}
                      placeholder='RAM amount'
                      onChange={onChange}
                  />
              </div>
              {/*storage input*/}
              <div className="form-group">
                  <input
                      type='text'
                      className='form-control'
                      id='storage'
                      name='storage'
                      value={storage}
                      placeholder='Storage Type and Amount'
                      onChange={onChange}
                  />
              </div>
              {/*category input*/}
              <div className="form-group">
                  <input
                      type='text'
                      className='form-control'
                      id='category'
                      name='category'
                      value={category}
                      placeholder='Desktop or Laptop'
                      onChange={onChange}
                  />
              </div>
              <div className="form-group">
                  <button type="submit" className='btn btn-block' onClick={reset}>Create</button>
              </div>
          </form>
      </section>

      <section className='content'>
        {computers.length > 0 ? (
          <div className='computers'>
            {computers.map((computer) => (
              <ComputerItemAdmin key={computer._id} computer={computer} />
            ))}
          </div>
        ) : (
          <h3>The inventory is empty</h3>
        )}
      </section>


  </>
    
}

export default InventoryForm