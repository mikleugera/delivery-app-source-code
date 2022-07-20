import React, { memo, useEffect, useRef} from "react";
import s from '../css/shop.module.css'
import {useDispatch, useSelector} from "react-redux";
import {addCartThunk, filterItemsThunk, getShopsThunk} from "../redux/Reducer";

export const Shop = memo(() => {
    const dispatch = useDispatch()
    const getFilterItems = useSelector((state) => state.shops.filterItems);
    const getShops = useSelector((state) => state.shops.shopsItems);

    useEffect(() => {
        dispatch(getShopsThunk())
    }, [dispatch])

    const handleAddCart = (e, id) => {
        e.preventDefault();    
        dispatch(addCartThunk(id));
    }

    const handleFilterItems = (e) => {
        e.preventDefault();
        dispatch(filterItemsThunk(e.currentTarget.value));
    } 

    return (
        <form className={s.form}>
            <div className={s.form_filter}>
                <div className={s.form_title}>
                    <h2>Shops</h2>
                </div>
                <div className={s.form_button}>  
                    {getShops.map((item, id) => (    
                        <input key={id} name="button" type='button' className={s.form_radio_btn}
                        value={item} onClick={(e) => handleFilterItems(e)}/>
                    ))}              
                </div>    
            </div>
            <div className={s.content}>
                    {getFilterItems.map(item => (
                            <div key={item.id} className={s.content_cart}>
                                <img src={item.img} alt="" className={s.content_cart_img}/>
                                <hr/>
                                <div>{item.name}</div>
                                <div className={s.content_cart_wrapper}>
                                    <div className={s.content_cart_price}>Price: {item.price}</div>
                                    <button className={s.content_cart_button} onClick={(e) => handleAddCart(e, item.id)}>Add to Cart</button>                              
                                </div>
                            </div>  
                    ))}
            </div>
        </form>
    )
});