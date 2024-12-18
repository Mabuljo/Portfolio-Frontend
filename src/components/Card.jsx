import React from 'react';

const Card = ({ projet, toggleModal }) => {

    return (
        <div className='card' onClick={toggleModal}>
            <img src={projet.cover} alt="" />
            <div className='card_content'>
                <h3>{projet.title}</h3>
                <div className='card_content--techno'>
                    {projet.technologies.map((tech, index) => (
                    <span key={index}>{tech}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;