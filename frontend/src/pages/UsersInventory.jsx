import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaLaptopCode } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import {getAvailableComputers, reset} from '../features/computers/computerSlice'
import ComputerItemUser from '../components/ComputerItemUser'

function UsersInventory() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {computers, isLoading, isError, message} = useSelector((state) => state.computers)

    useEffect(() => {
        if (isError) {
        console.log(message)
        }

        if (!user) {
        navigate('/login')
        }

        dispatch(getAvailableComputers())

        //dispatch(reset())

    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <FaLaptopCode size={'8em'}/>
                <h1>Welcome {user && user.name}</h1>
                <p>Our PCs To rent</p>
            </section>

            <section className='content'>
                {computers.length > 0 ? (
                    <div className='computers'>
                        {computers.map((computer) => (
                        <ComputerItemUser key={computer._id} computer={computer} />
                        ))}
                    </div>
                ) : (
                    <h3>Upps! We have nothing to rent right now</h3>
                )}
            </section>
        </>
    )

}

export default UsersInventory