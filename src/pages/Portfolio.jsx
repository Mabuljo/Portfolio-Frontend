import React, {useState,useEffect} from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Card from '../components/Card';
import Form from '../components/Form';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import axios from 'axios';


const Portfolio = () => {

    // Liste des logos avec le nom de chaque fichier d'image (sans extension)
    const iconNames = ['html5','css3','javascript','react','redux','sass','notion','github','figma']; 
    // Etat pour la technologie sélectionnée
    const [selectedTech, setSelectedTech] = useState(''); 
    // Liste des technologies
    const technologies = ['Tous', 'Sass', 'JavaScript', 'React'];

    // Fonction qui met à jour les projets en fonction du bouton cliqué
    const handleTechChange = (tech) => {
        setSelectedTech(tech === 'Tous' ? '' : tech); // Si on clique sur 'Tous', on réinitialise les technologies
    };

    const [projets, setProjets] = useState([]); // State pour les projets de l'API
    useEffect(() => {
        axios.get('http://localhost:5000/api/projets')  // URL local de mon API
            .then(response => {
                setProjets(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des projets', error);
            });
    }, []);

    // Variables et Fonction pour la Modale
    const [modal, setModal] = useState(false);
    const [selectedProjet, setSelectedProjet] = useState(null); // Etat pour le projet sélectionné

    const toggleModal = (projet) => {
        setModal(!modal); // Ouvre ou ferme la modale
        setSelectedProjet(projet || null);// Met à jour le projet sélectionné
    }

    useEffect(() => {
        if (modal) {
            document.body.classList.add('active-modal'); // Ajoute la classe quand modal est true
        } else {
            document.body.classList.remove('active-modal'); // Retire la classe quand modal est false
        }
    }, [modal]);
    return (
        <div>
            <Header />
            <main id='main'>
                <section id='presentation'>
                    <h2>Présentation</h2>
                    <div className='presentation_content'>
                        <img src="/assets/images/marjo-sepia.webp" alt="Marjorie Goudet" />
                        <div className='presentation_content--details'>
                            <p>Curieuse et touche-à-tout, j'ai toujours été attirée par le monde de l'informatique.<br/>En reconversion professionnelle, je me suis tout naturellement tournée vers la conception de sites web et j'ai suivi la formation diplômante d'intégrateur web chez OpenClassrooms.<br/>Passionnée, je me spécialise dans le langage JavaScript et React afin de créer des applications web dynamiques.</p>
                            <Button type='link' href="/assets/cv_marjorie_goudet.pdf" aria-label="Télécharger mon CV en PDF" text="Consulter mon CV (PDF)"/>
                        </div>
                    </div>
                </section>

                <section id='competences'>
                    <h2>Compétences</h2>
                    <div className='competences'>
                        {iconNames.map((iconName, index) => {
                            const imagePath =`/assets/icones/${iconName}.png`;
                            return (
                                <Icon key={index} src={imagePath} alt={iconName} />
                            )
                        })}
                    </div>
                </section>

                <section id='projets'>
                    <h2>Mes projets</h2>
                    <div className='projets'>
                        <div className='projets_buttons'>
                            {technologies.map((tech, index) => (
                                <Button 
                                key={index} 
                                type='button' 
                                text={tech} 
                                onClick={() => handleTechChange(tech)} 
                                isSelected={selectedTech === tech} // si la prop isSelected est true, on applique la className "btn-selected"
                                />
                            ))}
                        </div>
                        <div className='projets_cards'>
                            {projets.filter(projet => {
                                if (!selectedTech) {
                                    return true; // Si aucune technologie sélectionnée, afficher tous les projets
                                } else {
                                return projet.technologies.includes(selectedTech);  // Vérifier si la technologie du projet correspond au filtre
                                }
                            }).map((projet) => (
                                <Card projet={projet} key={projet._id} toggleModal={() => toggleModal(projet)} /> // Affiche le projet cliqué
                            ))}
                        </div>
                    </div>
                </section>

                <section id='contact'>
                    <h2>Me contacter</h2>   
                    <Form />
                 </section>
                 {/* Affichage conditionnel de la modale */}
                 {modal && <Modal projet={selectedProjet} toggleModal={toggleModal} isOpen={modal}/>}
            </main>
            <Footer />
        </div>
    );
};

export default Portfolio;