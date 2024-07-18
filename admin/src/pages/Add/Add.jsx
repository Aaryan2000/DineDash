import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
   
    const [image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })


    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler=async (event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
        const response=await axios.post(`${url}/api/food/add`,formData);
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }

 
  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt=""/>
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
            </div>

            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
            </div>

            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>

                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20'/>
                </div>
            </div>

            <button type='submit' className='add-btn'>Add</button>
        </form>
    </div>
  )
}

export default Add

/*type="file" specifies that this input is for file uploads.
id="image" assigns an ID to this input element, which links it to the label via the htmlFor attribute. */

/*URL.createObjectURL(image):
If a file has been selected (image is not false), URL.createObjectURL(image) creates a temporary URL representing the selected file, which can be used as the src for the <img> element. This allows displaying the selected image before it is uploaded to the server. */


/*e.target.files[0]:
e.target refers to the input element.
files is a FileList object containing all the selected files. files[0] gets the first file in the list (since this input only allows selecting one file at a time).
setImage(e.target.files[0]): This updates the state variable image with the selected file. setImage is a state setter function provided by the useState hook */

/*In plain HTML, the for attribute is used to bind a <label> element to a form element, such as an <input>, <select>, or <textarea>. This makes it so that when a user clicks on the label, it activates or focuses the associated form element.*/

/*In JSX (used in React), the attribute name is slightly different: htmlFor instead of for. This is because for is a reserved keyword in JavaScript, so React uses htmlFor to avoid conflicts. */

/*Form Submission Trigger:

The <form> element has an onSubmit handler: onSubmit={onSubmitHandler}.
Inside this form, the <button type="submit" className="add-btn">Add</button> is a submit button.
When the submit button is clicked, it triggers the form's submit event.
Handling the submit Event:

The onSubmitHandler function is called when the form is submitted.
Inside onSubmitHandler, event.preventDefault() is used to prevent the default behavior of form submission, which would normally cause a page reload.
Custom logic in onSubmitHandler collects the form data and sends it to the backend using axios.post. */