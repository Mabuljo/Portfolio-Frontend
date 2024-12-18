import React from 'react';

const Button = ({ type = "button", text, href, onClick, disabled = false, isSelected, newTab }) => {
    switch (type) {
        case "link": // Retourne un lien <a> si le type est "link"
            return (
                <a href={href} target={newTab ? '_blank' : '_self'} rel={newTab ? "noopener noreferrer" : undefined} className='btn link'>{text}</a>
            );
        case "submit": // Retourne un bouton de type "submit"
            return (
                <button type='submit' className=' btn submit' disabled={disabled} >{text}</button>
            );
        default: // Retourne un bouton classique de type "button"
            return (
                <button type='button' className={`btn ${isSelected ? 'btn-selected' : ''}`} onClick={onClick}>{text}</button>
            )
    }
};

export default Button;