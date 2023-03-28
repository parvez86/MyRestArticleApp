import React, { useEffect, useState } from 'react';
import '../App.css';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom'
function Login() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['myToken'])
    const [isLoginPage, setIsLoginPage] = useState(true)
    const [isRegToLogin, setIsRegToLogin] = useState(false)

    let navigate = useNavigate()

    useEffect(() => {
        if(token['myToken']){
            try{
                navigate('/articles')
            }catch(err){
                console.log(err);
            }
        }
    },[token])

    const loginUser = async() => {
        const payloadData = {
            url: 'http://127.0.0.1:8000/api/auth/',
            payload:{
                'method':'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({username, password})
            }
        }

        console.log(payloadData);
        let res = await fetch(payloadData.url, payloadData.payload);
        console.log(res);
        if (res.status === 200){
            res = await res.json();
            setToken('myToken', res.token)
        }
        setUserName('')
        setPassword('')
    }

    const registerUser = async() => {
        const payloadData = {
            url: 'http://127.0.0.1:8000/api/users/',
            payload:{
                'method':'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({username, password})
            }
        }

        console.log(payloadData);
        let res = await fetch(payloadData.url, payloadData.payload);
        console.log(res);
        if (res.status === 201){
            console.log(res.status);
            setIsRegToLogin(true)
        }
        setUserName('')
        setPassword('')
        setIsLoginPage(true)
    }

    const onLoginBtn = () => {
        (isLoginPage)? loginUser():registerUser();
    }
    
    return (
        <div className='App'>
        <div className='container justify-content-center' style={{height:"550px", width:"450px"}}>
            <br/>
            {
                isLoginPage?(
                    <h2 className='text-center'>Login</h2>
                ):(
                    <h2 className='text-center'>Register</h2>
                )
            }
            <br/>
            <br/>
            <div className='mb-3'>
                <label className='form-label' htmlFor='username'>Username</label> <br/>
                <input value={username} className='form-control' type="text" id="username" onChange={(e) => setUserName(e.target.value)}/>
            </div>

            <div className='mb-3'>
                <label className='form-label' htmlFor='password'>Password</label> <br/>
                <input value={password} className='form-control' type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className=''>
                <button className='btn btn-primary' onClick={onLoginBtn}>Submit</button>
            </div>
            <br/>
            <div>
                {
                    isLoginPage? (
                        <p> If you didn't have a account! Please <a className='text-primary text-bold' onClick={() => setIsLoginPage(false)}>Register</a> here!</p>
                    ):(
                        <p> Do you have account! Please <a className='text-primary text-bold' onClick={() => setIsLoginPage(true)}>Login</a> here!</p>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Login