import React from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';

const Error = () => {
    return (
        <div className='error'>
            <div className='container'>
                <div className='content'>
                    <h1>Oups...</h1>
                    <img src="/assets/images/error_404.svg" alt="Erreur 404"/>
                    <h2>La page que vous demandez n'existe pas.</h2>
                    <Button type='link' href="/" newTab={false} text="Retourner sur le portfolio"/>
                </div>
            </div>
            <Footer />
        </div>    
    );
};

export default Error;