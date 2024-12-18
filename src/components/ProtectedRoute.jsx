import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token'); // Récupèrer le token depuis le sessionStorage

  if (!token) {  
    return <Navigate to="/login" />; // Si le token est absent, redirige vers la page de login
  }

  return children;  // Si le token est présent, afficher la page Admin
};

export default ProtectedRoute;