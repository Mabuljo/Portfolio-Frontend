import React from 'react';

const Projet = ({projet, deleteTrash }) => {
    return (
        <div className='adminProjets_content--projet'>
            <p>{projet.title}</p>
            <i className="fa-solid fa-trash-can" onClick={() => deleteTrash(projet._id)}></i>
        </div>
    );
};

export default Projet;