import React from 'react';
import n from '../css/navbar.module.css'
import {Link} from "react-router-dom";

export const Navbar = () => {
    return <nav className={n.nav}>
        <div className={n.link}>
            <Link to="/shop">Shop</Link>
        </div>
        <div className={n.link}>
            <Link to="/shopping_cart">Shopping Cart</Link>
        </div>
    </nav>
};
