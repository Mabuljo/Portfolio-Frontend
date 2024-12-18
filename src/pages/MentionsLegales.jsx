import React from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';

const MentionsLegales = () => {
    return (
        <div className='mentions'>
            <div className='mentions_content'>
                <h1>Mentions légales</h1>
                <div className='mentions_content--text'>
                    <h2>Propriétaire du site :</h2>
                    <p>Ce site est le portfolio personnel de Marjorie Goudet, étudiante en développement web.</p>
                    <h2>Hébergeur du site :</h2>
                    <p>Vercel, Inc.<br />340 S Lemon Ave #4133<br />Walnut, CA 91789, USA.</p>
                    <h2>Contact :</h2>
                    <p>Pour toute question, vous pouvez me contacter via <a href="/#contact" className='link_form'>le formulaire de contact.</a></p>
                    <h2>Gestion des cookies :</h2>
                    <p>Ce site utilise uniquement un formulaire de contact. Aucun cookie de suivi ou de stockage n'est utilisé.</p>
                    <h2>Responsabilités :</h2>
                    <p>Ce site est destiné à présenter mes projets personnels. Je ne suis pas responsable des erreurs ou dysfonctionnements éventuels. Aucun contenu commercial n'est proposé.</p>
                </div>
                <Button type='link' href="/" newTab={false} text="Retourner sur le portfolio"/>
            </div>
            <Footer />
        </div>
    );
};

export default MentionsLegales;