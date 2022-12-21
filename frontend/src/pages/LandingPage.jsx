import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FaLaptopCode } from 'react-icons/fa'

function LandingPage() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {user, isLoading, isError, message} = useSelector((state) => state.auth)
    
    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        
        if(user) {
            navigate('/dashboard')
        }
        
        dispatch(reset())
    }, [user, isError, message, navigate, dispatch])
    
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='container'>
                <table>
                    <tr>
                        <td>
                            <div><h1> Alquiler de PCs  </h1></div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div><img src={process.env.PUBLIC_URL + '/instrucciones.png'} alt="image" height='40%' width='40%' /></div>
                        </td>
                    </tr>
                </table>
            </section>
        </>
      )
}

export default LandingPage