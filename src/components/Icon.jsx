import React from 'react';

const Icon = ({ src, alt}) => {
    return (
        <img src={src} alt={`Icone ${alt}`} className='icon' />
    );
};

export default Icon;