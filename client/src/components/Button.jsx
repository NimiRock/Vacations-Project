import React from 'react';
import './Button.css';
import { NavLink } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];

export default function Button({ children, type, onClick, buttonStyle, buttonSize, className }) {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    

    return (
        <>
            <NavLink to={className==='btns login-button' ? '/login' : '/sign-up'} duration={1000} className='btn-mobile'>
                <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
                    {children}
                </button>
            </NavLink>
        </>
    )
}
// smooth={true}