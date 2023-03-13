import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { turnOnLogin, turnOnLoading, turnOffLoading, setUser } from '../features/mainSlice'
import Cookies from 'js-cookie'
import { postToAPI } from '../utils/postToAPI'


const CreateUser = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalidInputArray, setInvalidInputArray] = useState([])
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('default')
    const [emailErrorMessage, setEmailErrorMessage] = useState('default')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('default')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onCreateAccount = async () => {

        dispatch(turnOnLoading())

        let err = [...invalidInputArray]

            // check if any field is missing or is invalid
            if (!username) {
                err.push('username')

                setUsernameErrorMessage('Please Enter Username')
            }

            if (!email) {
                err.push('password')

                setEmailErrorMessage('Please Enter Email')

            } else if (!email.includes('@') || !email.includes('.')) {
                err.push('email')

                setEmailErrorMessage('Please enter valid email')
            }

            if (!password) {
                err.push('password')

                setPasswordErrorMessage('Please Enter Password')

            } else if (password.length < 8 || password.length > 20) {
                err.push('password')

                setPasswordErrorMessage('Password should be 8-20 characters')
            }

            setInvalidInputArray((prev => [...prev, ...err]))

            if(err.length > 0){
                return dispatch(turnOffLoading())
            }

            try {


            const accountInfo = {
                username,
                email,
                password
            }

            const response = await postToAPI('/api/createuser', accountInfo)

            Cookies.set('jwt_token', response.data.token, {expires: 1})
            Cookies.set('userId', response.data._id, {expires: 1})
            Cookies.set('username', response.data.username, {expires: 1})

            
            dispatch(setUser(response.data))

            navigate('/')

            dispatch(turnOnLogin())
            dispatch(turnOffLoading())



        } catch (error) {
            
            dispatch(turnOffLoading())

            switch (error.response?.data.code) {
                case '402':
                    setInvalidInputArray((prev) => [...prev, 'email'])

                    setEmailErrorMessage('Email is already registered');
                    break;

                case '403':
                    setInvalidInputArray((prev) => [...prev, 'username'])

                    setUsernameErrorMessage('Username is taken');
                    break;
            }
        }
    }

    return (
        <div className='h-screen flex flex-row justify-center items-center'>
            <div
                className='flex flex-col gap-[2px]'
            >
                <div>
                    <input
                        className='border-2 border-slate-200 rounded h-8 w-96 outline-none'
                        type="text" placeholder='Username'
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                            const tempIncompleteInputArray = invalidInputArray.filter((arrItem) => arrItem != 'username')
                            setInvalidInputArray([...tempIncompleteInputArray])
                        }
                        }
                    />
                    <div className={`text-red-300 text-xs ${invalidInputArray.includes('username') ? 'block' : 'invisible'}`}>
                        <div>
                            {usernameErrorMessage}
                        </div>

                    </div>
                </div>
                <div>
                    <input
                        className='border-2 border-slate-200 rounded h-8 w-96 outline-none'
                        type="email" placeholder='Email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)

                            const tempIncompleteInputArray = invalidInputArray.filter((arrItem) => arrItem != 'email')
                            setInvalidInputArray([...tempIncompleteInputArray])
                        }
                        }
                    />
                    <div className={`text-red-300 text-xs ${invalidInputArray.includes('email') ? 'block' : 'invisible'}`}>
                        <div>
                            {emailErrorMessage}
                        </div>

                    </div>
                </div>
                <div>

                    <input
                        className='border-2 border-slate-200 rounded h-8 w-96 outline-none'
                        type="password" placeholder='Password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            const tempIncompleteInputArray = invalidInputArray.filter((arrItem) => arrItem != 'password')
                            setInvalidInputArray([...tempIncompleteInputArray])
                        }
                        }
                    />
                    <div className={`text-red-300 text-xs ${invalidInputArray.includes('password') ? 'block' : 'invisible'}`}>
                        <div>
                            {passwordErrorMessage}
                        </div>

                    </div>
                </div>
                <button
                    className='bg-slate-900 px-4 py-2 text-white rounded-lg'
                    onClick={onCreateAccount}
                >Create Account</button>
                <p 
                className='text-center mt-2'
                >Already have an account? 
                    &nbsp;
                        <Link to='/u/login'
                        className='text-cyan-700'
                        >
                            Login here.
                        </Link>

                </p>
            </div>
        </div>

    )
}

export default CreateUser