import React, { useCallback, useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {
    const {url,setToken}=useContext(StoreContext)
    const [currState,setCurrState]=useState("Login")
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

   const onLogin=async(event)=>{
    event.preventDefault()
    let newURL=url;
    if(currState==="Login"){
        newURL+="/api/user/login"
    }
    else{
        newURL+="/api/user/register"
    }

    const response=await axios.post(newURL,data)
    if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
   }
   else{
    alert(response.data.message)

   }
}


  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}/>
            </div>
            <div className='login-popup-inputs'>
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required/> }
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {currState==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
            
        </form>
    </div>
  )
}

export default LoginPopup

/*The required attribute in the  element makes the input field mandatory. When a form containing this input field is submitted, the browser will prevent the form submission and prompt the user to fill out the field if it is left empty. */

/*Purpose: The name attribute is used to identify the input element. When dealing with forms, the name attribute is used to specify the key in the form data object that corresponds to the value of this input field. */

/*Purpose: The value attribute specifies the current value of the input field. In a controlled component, this value is set by the component's state. */

/*Purpose
When you call event.preventDefault() within an event handler, you stop the browser from executing the default action associated with that event.

Use Case in Forms
In the context of a form submission, using event.preventDefault() allows you to handle the form data in JavaScript, such as sending it via an AJAX request or performing client-side validation before submission. */

/*In the line setData(data => ({ ...data, [name]: value }));, the state update function is merging the existing state with the new value for the specified key. This means that the data object is being spread into a new object, and then the property specified by [name] is updated with the new value. */