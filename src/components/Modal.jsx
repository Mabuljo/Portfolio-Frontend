import React, { useEffect, useState } from 'react';
import Button from './Button';

const Modal = ({projet, toggleModal, isOpen}) => {

    const [visible, setVisible] = useState(false);  

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setVisible(true), 10); // Petit délai pour permettre le montage du DOM avant l'animation d'ouverture
        }
    }, [isOpen]);

    return (
        <div className={`modal ${visible ? 'is-open' : ''}`}>
            <div className='modal_container'>
                <img src={projet.cover} alt={projet.title} />
                <div className='modal_content'>
                    <h4>{projet.title}</h4>
                    <div className='modal_content--description'>
                        {projet.description.map((descrip,index) =>(
                        <p key={index}>{descrip}</p>))}
                    </div>
                    <div className='modal_content--buttons'>
                        <Button type='link' href={projet.github} text="Lien Github"/>
                        {projet.site && (
                            <Button type="link" href={projet.site} text="Consultez le site" />
                        )}
                    </div>
                </div>
                <i className='fa-solid fa-xmark close-modal' onClick={toggleModal}></i>
            </div>
        </div>
    ) 
};  

export default Modal;