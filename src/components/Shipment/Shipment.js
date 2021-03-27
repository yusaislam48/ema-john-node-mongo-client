import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    
  const { register, handleSubmit, watch, errors } = useForm();
  
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
    console.log(data);
    const savedCart = getDatabaseCart();
    const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()}
    // 
    fetch('https://emajohn.herokuapp.com/addOrder', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        processOrder();
        alert('Your order placed successfully!')
      }
    })

  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
        {errors.name && <span className="error">Name is required</span>}

        <input name="email" defaultValue={loggedInUser.email}  ref={register({ required: true })} />
        {errors.email && <span className="error">Email is required</span>}

        <input name="add" placeholder="Your Address" ref={register({ required: true })} />
        {errors.add && <span className="error">Add is required</span>}

        <input name="phone" placeholder="Your Phone Number"  ref={register({ required: true })} />
        {errors.phone && <span className="error">Phone is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;