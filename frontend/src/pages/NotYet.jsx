import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { FaLaptopCode } from 'react-icons/fa'

function NotYet() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const {isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <FaLaptopCode size={'8em'}/>
        <h1>We're sorry {user && user.name}</h1>
        <p>This part of our side is not ready yet, please come back later</p>
      </section>
      
  
    </>
  )
}

export default NotYet