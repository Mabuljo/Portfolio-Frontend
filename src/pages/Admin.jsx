import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Projet from '../components/Projet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalAdmin from '../components/ModalAdmin';

const Admin = () => {
    const [projetsAdmin, setProjetsAdmin] = useState([]); // State pour les projets de l'API
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    // Pour récupérer les projets
    const fetchProjets = () => {
        axios.get('http://localhost:5000/api/projets')  // URL local de mon API
            .then(response => {
                setProjetsAdmin(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des projets', error);
            });
    };

    useEffect(() => {
        fetchProjets();
    }, []);

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Supprimer le token du sessionStorage
        navigate('/'); // Rediriger vers la page d'accueil
    };

    // Fonction pour supprimer un projet
    const deleteProjet = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce projet ?")) {
            try {
                await axios.delete(`http://localhost:5000/api/projets/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Mettre à jour le state pour retirer le projet supprimé
                setProjetsAdmin(projetsAdmin.filter(projet => projet._id !== id));
            } catch (error) {
                console.error('Erreur lors de la suppression du projet', error);
            }
        }
    };

    // Variables et Fonction pour la Modale d'ajout de projet
        const [modalAdmin, setModalAdmin] = useState(false);
        const toggleModalAdmin= () => {
            setModalAdmin(!modalAdmin); // Ouvre ou ferme la modale
        };
        useEffect(() => {
                if (modalAdmin) {
                    document.body.classList.add('active-modalAdmin'); // Ajoute la classe quand modal est true
                } else {
                    document.body.classList.remove('active-modalAdmin'); // Retire la classe quand modal est false
                }
            }, [modalAdmin]);

    return (
        <div className='admin'>
            <div className='adminSection'>
                <div className='adminSection_menu'>
                    <a href="/" target='_self' aria-label='Log out'className='logout'>Portfolio</a>
                    <a href="/" target='_self' aria-label='Log out' className='logout' onClick={handleLogout} >Log out</a> 
                </div>
                <h1>Bienvenue !</h1>
                <div className='adminProjets'>
                    <h2>Gestion des projets</h2>
                    <div className='adminProjets_content'>
                        {projetsAdmin.map((projetAdmin) => (<Projet projet={projetAdmin} key={projetAdmin._id} deleteTrash={deleteProjet}/>))}
                    </div>
                    <Button type='button' text="Ajouter un projet" onClick={toggleModalAdmin}/>
                </div>
                {/* Affichage conditionnel de la modale */}
                {modalAdmin && <ModalAdmin toggleModalAdmin={toggleModalAdmin} isOpen={modalAdmin} token={token} refreshProjets={fetchProjets}/>}
            </div> 
            <Footer />
        </div>
    );
};

export default Admin;