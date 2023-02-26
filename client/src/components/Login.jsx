import React, { useState } from 'react'
import './style.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()

    const [password, setPassword] = useState(false)


    const [input, setInput] = useState({
     
        email: '',
        password: '',
      
    })



    const handleChange = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target

        setInput(() => {
            return {
                ...input, [name]: value
            }

        })


    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const {email, password}=input;

       if(email ===''){
            alert("Please enter your email")
        }
        else if(!email.includes('@')){
            alert("Please enter valid email")
        }else if(password===''){
            alert("Please enter your password")
        }else if(password.length <8){
            alert("Password must have 8 characters")
        }
        else {
            

            const data= await fetch("http://localhost:5000/login",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email, password,
                })
            })

            const res= await data.json()
            // console.log(res);
            if(res.status === 200){
               
                localStorage.setItem("usersdatatoken",res.result.token);
                navigate('/homepage')
                setInput({...input,email:'',password:'',})
            }

        }

    }


    return (
        <>
            <section>

                <div className="formData">
                    <div className="formHeading">
                        <h1>Please, Log In </h1>
                    </div>

                    <form >
                        <div className='formInput'>
                            <label htmlFor="email">Email</label>
                            <input type="email"  name='email' id='email' placeholder='Enter your email' value={input.email} onChange={handleChange} />
                        </div>
                        <div className='formInput'>
                            <label htmlFor="password">Password</label>
                            <div className='password'>
                                <input type={!password ? 'password' : 'text'} name='password' value={input.password} id='password' placeholder='Enter your password' onChange={handleChange}/>
                                <div className="showPassword"  onClick={() => setPassword(!password)}>
                                    {!password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </div>
                            </div>


                        </div>
                        <button className='btn' onClick={handleSubmit} >Login</button>
                        <p>Don't have an Account? <Link to={'/'}> Sign Up</Link></p>
                    </form>
                </div>
            </section>

        </>
    )
}

export default Login
