import React, { useEffect, useState } from 'react';
import Button from './Button';
import axios from 'axios';

const ModalAdmin = ({toggleModalAdmin, isOpen, token, refreshProjets}) => {
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State pour le loader
    const [description, setDescription] = useState([""]);
    const [technologies, setTechnologies] = useState([""]);
    const [formData, setFormData] = useState({
        title: '',
        github: '',
        site: '',
        cover: '',
    });

    const addCover = (e) => {
        // Libérer l'ancienne URL si une image était déjà sélectionnée
        if (formData.cover) {
            URL.revokeObjectURL(formData.cover);
        }
        // Mettre à jour le state avec le nouveau fichier
        setFormData({ ...formData, cover: e.target.files[0] });
    };

    const addDescription = () => {
        setDescription([...description, ""]); // Lorsqu'un utilisateur clique, un nouveau champ est ajouté
    };

    const addTechnology = () => {
        setTechnologies([...technologies, ""]);
    };

    const handleDescription = (e, index) => {
        const newDescription = [...description]; //Crée une copie de la liste actuelle
        newDescription[index] = e.target.value; // Modifie l'élément à l'index donné
        setDescription(newDescription); // Met à jour le state Description
    };

    const handleTechnology = (e, index) => {
        const newTechnologies = [...technologies];
        newTechnologies[index] = e.target.value;
        setTechnologies(newTechnologies);
    };

    const projectSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true); // Activer le loader

        // Création de l'objet projectData avant l'envoi de la requête à l'API
        const projectData = {
            title: formData.title,
            github: formData.github,
            site: formData.site,
            cover: `/assets/projets/${formData.cover.name}`, // Générer le chemin de l'image
            description: description,
            technologies: technologies,
        };

        // Envoyer la requête POST avec Axios
        axios.post('http://localhost:5000/api/projets', projectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log('Projet ajouté:', response.data);
            setError(''); // Si la requête réussie, on réinitialise l'erreur.
            refreshProjets();     // Actualiser la liste des projets dans Admin
            toggleModalAdmin();   // Fermer la modale
        })
        .catch(error => {
            console.error(`Erreur lors de l'ajout du projet:`, error);
            setError(error.response.data.message || 'Une erreur est survenue.');
        })
        .finally(() => {
            setIsLoading(false); // Désactiver le loader après la requête
        });
    };

    useEffect(() => {
            if (isOpen) {
                setTimeout(() => setVisible(true), 10); // Petit délai pour permettre le montage du DOM avant l'animation d'ouverture
            }
    }, [isOpen]);

    return (
        <div className={`modalAdmin ${visible ? 'is-open' : ''}`}>
            <div className='modalAdmin_container'>
                <i className='fa-solid fa-xmark close-modal' onClick={toggleModalAdmin}></i>
                <h3>Ajout d'un projet</h3>
                <form className='modalAdmin_form' onSubmit={projectSubmit}>
                    <div className='modalAdmin_form--addCover'>
                        {/* Affiche l'icône seulement si aucune image n'est sélectionnée */}
                        {!formData.cover && <i className="fa-regular fa-4x fa-image"></i>}
                        {/* Affiche la prévisualisation si une image est sélectionnée */}
                        {formData.cover && (
                            <img
                                id="cover-preview"
                                src={URL.createObjectURL(formData.cover)} // créer une URL temporaire pour le fichier sélectionné
                                alt="Prévisualisation de l'image du projet"
                            />
                        )}
                        <label htmlFor="cover" className='add-cover'>+ Ajouter Photo</label>
                        <input
                            type="file"
                            id="cover"
                            name="cover"
                            required
                            onChange={addCover}
                        />
                        {/* Affiche le nom du fichier sélectionné */}
                        {formData.cover && (
                        <p>Image sélectionnée : {formData.cover.name}</p>)}
                        <p>webp : 4mo max</p>
                    </div>
                    <div className='modalAdmin_form--text'>
                        <div className='modalAdmin_form--details'>
                            <label htmlFor="title">Titre</label>
                            <input type="text" name="title" required value={formData.title} 
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })} /> 
                            {/* met à jour le champ spécifique dans l'objet formData, sans écraser les autres champs */}
                        </div>
                        <div className='modalAdmin_form--details'>
                            <div className='modalAdmin_form--details mobile'>
                                <label htmlFor="Description">Description</label>
                                <div className='descriptions'>
                                    {description.map((desc, index) => (
                                        <input key={index} type="text" name="Description" required value={desc}
                                            onChange={(e) => handleDescription(e, index)}
                                            placeholder={`Description ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <Button type="button" text="+ Description" onClick={addDescription} />
                        </div>
                        <div className='modalAdmin_form--details'>
                            <div className='modalAdmin_form--details mobile'>
                                <label htmlFor="Technologie">Technologie</label>
                                <div className='technologies'>
                                    {technologies.map((tech, index) => (
                                        <input key={index} type="text" name="Technologie" required value={tech}
                                            onChange={(e) => handleTechnology(e, index)}
                                            placeholder={`Technologie ${index + 1}`}
                                        />
                                    ))}
                                </div>    
                            </div>
                            <Button type="button" text="+ Technologie" onClick={addTechnology} />
                        </div>
                        <div className='modalAdmin_form--details'>
                            <label htmlFor="github">Lien Github</label>
                            <input type="text" name="github" required value={formData.github} 
                            onChange={(e) => setFormData({ ...formData, github: e.target.value })} />
                        </div>
                        <div className='modalAdmin_form--details'>
                            <label htmlFor="site">Lien du site</label>
                            <input type="text" name="site" value={formData.site} 
                            onChange={(e) => setFormData({ ...formData, site: e.target.value })}/>
                        </div>
                    </div>
                    {error && <p className="connexion-error">{error}</p>}
                    <Button type='submit' text={isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Valider"}/>
                </form>
            </div>
        </div>
    );
};

export default ModalAdmin;