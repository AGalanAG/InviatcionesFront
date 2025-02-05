import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import WelcomeSection from './components/WelcomeSection';
import FamilySection from './components/FamilySection';
import EventDetails from './components/EventDetails';
import RSVPForm from './components/RSVPForm';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const RSVPButton = styled.button`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: 30px;
  font-family: ${({ theme }) => theme.fonts.terciary};
  font-size: 1.1rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.animations.transition};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

// Configuración de Axios para el backend
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const App = () => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const eventData = {
    quinceañera: {
      name: "Natalia Gonzalez Garcia",
      image: "/img/vestidoIA1.png"
    },
    family: {
      parents:{
        father: "Sr. Alberto González García",
        mother: "Sra. Elizabeth Esperanza García Maya"
      },
      godparents: {
        godfather: "Sr. Luis Alberto Cruz Avila",
        godmother: "Sra. Yasmin Marisol González Beltran"
      }
    },
    event: {
      date: "Sabado, 26 de abril de 2025",
      mass: {
        time: "6:00 pm",
        venue: "Se llevará a cabo en el mismo lugar de la celebración"
      },
      reception: {
        time: "7:00 pm",
        venue: "La Finca del Agave",
        address: "Escandinavo 21, San Jose Buenavista, 54710 Cuautitlán Izcalli, Méx."
      },
      location: {
        lat: 19.6796515,
        lng: -99.2309391
      },
      dressCode: "Formal/Casual, como te sientas más cómodo",
      registry: "Los regalos no son necesarios, lo más importante es tu presencia"
    }
  };

  const handleRSVPSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/api/attendance', formData);
      
      if (response.status === 201) {
        alert('¡Registro exitoso!');
        setIsRSVPOpen(false);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Error al procesar tu registro';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <WelcomeSection
        parents={eventData.family.parents}
        name={eventData.quinceañera.name}
        date={eventData.event.date}
        image={eventData.quinceañera.image}
      />
      <FamilySection 
        parents={eventData.family.parents} 
        godparents={eventData.family.godparents} 
      />
      <EventDetails
        mass={eventData.event.mass}
        reception={eventData.event.reception}
        location={eventData.event.location}
        dressCode={eventData.event.dressCode}
        registry={eventData.event.registry}
      />

      <RSVPButton onClick={() => setIsRSVPOpen(true)}>
        Confirmar asistencia
      </RSVPButton>
      
      <RSVPForm
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
        onSubmit={handleRSVPSubmit}
        loading={loading}
        error={error}
      />
    </ThemeProvider>
  );
};

export default App;