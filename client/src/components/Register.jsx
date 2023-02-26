import React, { useState } from 'react'
import './style.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';


const Login = () => {

    const [password, setPassword] = useState(false)
    const [confirmpassword, setConfirmPassword] = useState(false)

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    })



    const handleChange = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target

        setInput(() => {
            return {
                ...input, [name]: value
            }

        })


    }

    const handleSubmit= async(e)=>{
        e.preventDefault();

        const {name,email, password,confirmpassword}=input;

        if(name ===''){
            alert("Please enter your name");
        }
        else if(email===''){
            alert("Please enter your email")
        }
        else if(!email.includes('@')){
            alert("Please enter valid email")
        }else if(password===''){
            alert("Please enter your password")
        }else if(confirmpassword===''){
            alert("Please enter your password")
        }else if(password.length <8){
            alert("Password must have 8 characters")
        }
        else if(password !== confirmpassword){
            alert("password and confirm password not match")
        }
        else {
            // console.log("registered successfully");

            const data= await fetch("http://localhost:5000/register",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,email, password,confirmpassword
                })
            })

            const res= await data.json()
            // console.log(res.status);
            if(res.status === 200){
                alert("user registered successfully")
                setInput({...input,name:'',email:'',password:'',confirmpassword:''})
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
                            <label htmlFor="name">Name</label>
                            <input type="text" onChange={handleChange} name='name' value={input.name} id='name' placeholder='Enter your name' />
                        </div>
                        <div className='formInput'>
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={handleChange} name='email' value={input.email} id='email' placeholder='Enter your email' />
                        </div>
                        <div className='formInput'>
                            <label htmlFor="password">Password</label>
                            <div className='password'>
                                <input type={!password ? 'password' : 'text'} name='password' value={input.password} onChange={handleChange} id='password' placeholder='Enter your password' />
                                <div className="showPassword" onClick={() => setPassword(!password)}>
                                    {!password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </div>
                            </div>


                        </div>
                        <div className='formInput'>
                            <label htmlFor="confirmpassword">Confirm Password</label>
                            <div className='password'>
                                <input type={!confirmpassword ? 'password' : 'text'} value={input.confirmpassword} onChange={handleChange} name='confirmpassword' id='confirmpassword' placeholder='Confirm your password' />
                                <div className="showPassword" onClick={() => setConfirmPassword(!confirmpassword)}>
                                    {!confirmpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </div>
                            </div>


                        </div>
                        <button className='btn' onClick={handleSubmit}>Register</button>
                        <p >Already have an Account? <Link to={'/login'}>Sign In</Link> </p>
                    </form>
                </div>
            </section>

        </>
    )
}

export default Login
