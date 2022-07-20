import React, { useState} from "react";
import sc from '../css/shopping_cart.module.css'
import { useSelector, useDispatch } from "react-redux";
import { addQuantityThunk, removeItemThunk, sendDBThunk, subQuantityThunk } from "../redux/Reducer";

export const ShoppingCard = () => { 

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const dispatch = useDispatch();
    const getCartItem = useSelector((state) => state.shops.addedItems);
    const getTotal = useSelector((state) => state.shops.total);

    const handleAddQuantity = (e, id) => {
        e.preventDefault();
        dispatch(addQuantityThunk(id))
    }

    const handleSubQuantity = (e, id) => {
        e.preventDefault();
        dispatch(subQuantityThunk(id))
    }

    const handleRemoveItem = (e, id) => { 
        e.preventDefault();
        dispatch(removeItemThunk(id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getCartItem.map(item => dispatch(sendDBThunk({
            name: name, email: email, phone: phone, adress: address, 
            name_product: item.name, count_product: item.quantity, shop_product: item.shop
        })));
        document.querySelector('#form').reset();
    }

    return (
        <form id='form'>
            <div className={sc.main_wrapper}>
                <div className={sc.contacts_wrapper}>
                    <div className={sc.contacts_block}>
                        <label className={sc.contacts_text}>Name</label>        
                        <input id="name" type="text" name="text" className={sc.contacts_input} onChange={(e) => setName(e.target.value)}/>  
                    </div>
                    <div className={sc.contacts_block}>
                        <label className={sc.contacts_text}>Email</label>        
                        <input id="email" type="email" name="email" className={sc.contacts_input} onChange={(e) => setEmail(e.target.value)}/>  
                    </div>
                    <div className={sc.contacts_block}>
                        <label className={sc.contacts_text}>Phone</label>        
                        <input id="phone" type="phone" name="phone" className={sc.contacts_input} onChange={(e) => setPhone(e.target.value)}/>  
                    </div>
                    <div className={sc.contacts_block}>
                        <label className={sc.contacts_text}>Address</label>        
                        <input id="address" type="address" name="address" className={sc.contacts_input} onChange={(e) => setAddress(e.target.value)}/>  
                    </div>
                </div>
                <div className={sc.list_order}>
                    {getCartItem.map(item => (
                        <div key={item.id} className={sc.list_order_cart}>
                            <img src={item.img} alt="" className={sc.list_order_img}/>
                            <div className={sc.list_order_wrapper}>
                                <div className={sc.list_order_title}>{item.name}</div>
                                <div className={sc.list_order_price}>Price: {item.price}</div>  
                                <div>                                   
                                    <button className={sc.list_order_button_quantity} onClick={(e) => handleAddQuantity(e, item.id)}>+</button>                                       
                                    <input id="number" type="text" name="number" readOnly value={item.quantity} className={sc.list_order_input}/>  
                                    <button className={sc.list_order_button_quantity} onClick={(e) => handleSubQuantity(e, item.id)}>-</button> 
                                </div>           
                                <button className={sc.list_order_button} onClick={(e) => handleRemoveItem(e, item.id)}>Remove</button>                                      
                            </div>
                        </div>  
                    ))}
                </div>
            </div>
            <div className={sc.footer_wrapper}>
                <div className={sc.footer_total}>Total price: {getTotal}</div>   
                <button className={sc.footer_buuton} onClick={(e) => handleSubmit(e)}>Submit</button> 
            </div>
        </form>
    )
};