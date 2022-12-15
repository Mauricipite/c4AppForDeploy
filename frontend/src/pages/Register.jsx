import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        phoneNumber: '',
        identification: '',
        address: ''
    })

    const {name, email, password, password2, phoneNumber, identification, address} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                phoneNumber,
                identification,
                address,
                password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner/>
    }

    return <>
        <section className='heading'>
            <h1>
                <FaUser/> Register
            </h1>
            <p>Please create an account</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                {/*name input*/}
                <div className="form-group">
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Enter your name'
                        onChange={onChange}
                    />
                </div>
                {/*email input*/}
                <div className="form-group">
                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={onChange}
                    />
                </div>
                {/*password input*/}
                <div className="form-group">
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Enter a password'
                        onChange={onChange}
                    />
                </div>
                {/*confirm password input*/}
                <div className="form-group">
                    <input
                        type='password'
                        className='form-control'
                        id='password2'
                        name='password2'
                        value={password2}
                        placeholder='Confirm password'
                        onChange={onChange}
                    />
                </div>
                {/*phoneNumber input*/}
                <div className="form-group">
                    <input
                        type='tel'
                        className='form-control'
                        id='phoneNumber'
                        name='phoneNumber'
                        value={phoneNumber}
                        placeholder='Enter your phone Number'
                        onChange={onChange}
                    />
                </div>
                {/*identification input*/}
                <div className="form-group">
                    <input
                        type='number'
                        className='form-control'
                        id='identification'
                        name='identification'
                        value={identification}
                        placeholder='Enter your ID/identification'
                        onChange={onChange}
                    />
                </div>
                {/*address input*/}
                <div className="form-group">
                    <input
                        type='text'
                        className='form-control'
                        id='address'
                        name='address'
                        value={address}
                        placeholder='Enter your address'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
}

export default Register