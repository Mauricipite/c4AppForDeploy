import { FaSignInAlt, FaSignOutAlt, FaUser, FaAccessibleIcon } from 'react-icons/fa'
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

  // return (
  //   <header className='header'>
  //     <div className='logo'>
  //       <Link to='/'>GoalSetter</Link>
  //     </div>
  //     <ul>
  //       {user ? (
  //         <li>
  //           <button className='btn' onClick={onLogout}>
  //             <FaSignOutAlt /> Logout
  //           </button>
  //         </li>
  //       ) : (
  //         <>
  //           <li>
  //             <Link to='/login'>
  //               <FaSignInAlt /> Login
  //             </Link>
  //           </li>
  //           <li>
  //             <Link to='/register'>
  //               <FaUser /> Register
  //             </Link>
  //           </li>
  //         </>
  //       )}
  //     </ul>
  //   </header>
  // )

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
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
                          <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                          </button>
                        </li>
                        <li>
                          <button className='btn'>
                            <FaAccessibleIcon /> Admin
                          </button>
                        </li>
                      </>
                      )
            if (user.admin == false)
              return (
                      <li>
                        <button className='btn' onClick={onLogout}>
                          <FaSignOutAlt /> Logout
                        </button>
                      </li>
                      )
          })()
        }
      </ul>
    </header>
  )

}

export default Header
