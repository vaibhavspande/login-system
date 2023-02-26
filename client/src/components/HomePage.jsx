import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import { Avatar, } from '@mui/material';
import image from './image/avtar.jpg'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './style.css'
const HomePage = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const { loginData, setLoginData } = useContext(LoginContext)
    // console.log(loginData.validUser.name);

    // console.log(loginData);
    const navigate = useNavigate();

    const HomePageValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("http://localhost:5000/verify", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        const data = await res.json()

        if (data.status === 400 || !data) {
            // console.log("error page");
            navigate('*')

        }
        else {
            // console.log('user verify');
            setLoginData(data)
            navigate('/homepage')
        }
    }

    useEffect(() => {
        HomePageValid()
    })


    const logOut = async()=>{

 let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("http://localhost:5000/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept:'application/json'
            },
            credentials:'include'
        });
        const data = await res.json()
console.log(data);
        if (data.status === 200) {
         
            console.log('ulogout');
            localStorage.removeItem("usersdatatoken");
             setLoginData(false)
             navigate('/')

        }
        else {
            console.log("error page");
        }
    }


    return (
        <>
            <section>
                <div className="homepage">
                    <div className="profile"><h1 >Vaibhav Pande</h1>
                        <div className="details">
                            <div className="primaryInformation">
                                <label htmlFor="">Name</label>
                                <h4> Vaibhav Somnath Pande</h4>
                            </div>
                            <div className="secondaryInformation">
                                Hello
                            </div>
                        </div>

                    </div>
                    <div className="avtar">
                        <Avatar src={image} onClick={handleClick} />
                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >

                        <MenuItem onClick={() => {
                                        logOut()
                                        handleClose()
                                    }}>Logout</MenuItem>
                    </Menu>


                </div>
            </section>

        </>


    )
}

export default HomePage
