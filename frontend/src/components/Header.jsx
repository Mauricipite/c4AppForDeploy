import { FaSignInAlt, FaSignOutAlt, FaUser, FaUsers, FaHouseUser, FaCalendarAlt, FaBoxes, FaCalendarPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const notYet = () => {
    navigate('/notyet')
  }

  const inventory = () => {
    navigate('/new')
  }

  const rent = () => {
    navigate('/rent')
  }



  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Pc Rentals</Link>
      </div>
      <ul>
        {
          (() => {
            if (!user)
              return (
                      <>
                        <li>
                          <Link to='/login'>
                            <FaSignInAlt /> Login
                          </Link>
                        </li>
                        <li>
                          <Link to='/register'>
                            <FaUser /> Register
                          </Link>
                        </li>
                      </>
                      )
            if (user.admin == true)
              return (
                      <>
                        <li>
                          <button className='btnot' onClick={notYet}>
                            <FaUsers /> Users
                          </button>
                        </li>

                        <li>
                          <button className='btnot' onClick={notYet}>
                            <FaCalendarAlt /> Reservations
                          </button>
                        </li>

                        <li>
                          <button className='btn' onClick={inventory}>
                            <FaBoxes /> Inventory
                          </button>
                        </li>

                        <li>
                          <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                          </button>
                        </li>
                      </>
                      )
            if (user.admin == false)
              return (
                      <>
                      <li>
                        <button className='btnot' onClick={notYet}>
                          <FaHouseUser /> MyProfile
                        </button>
                      </li>

                      <li>
                        <button className='btnot' onClick={notYet}>
                          <FaCalendarAlt /> MyReservations
                        </button>
                      </li>

                      <li>
                        <button className='btn' onClick={rent}>
                          <FaCalendarPlus /> Rent a pc
                        </button>
                      </li>

                      <li>
                        <button className='btn' onClick={onLogout}>
                          <FaSignOutAlt /> Logout
                        </button>
                      </li>
                      </>
                      )
          })()
        }
      </ul>
    </header>
  )

}

export default Header
