import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const EventContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const DetailCard = styled(animated.div)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const EventTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const EventTime = styled.p`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.4rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const VenueName = styled.p`
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.6rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.3rem;
  }
`;

const Address = styled.p`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  white-space: pre-line;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.4;
  }
`;

const MapContainer = styled.div`
  height: 300px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 200px;
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
`;

const MapLink = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: 5px;
  text-decoration: none;
  margin-top: ${({ theme }) => theme.spacing.md};
  transition: ${({ theme }) => theme.animations.transition};
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: 1.1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: 1rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const DecorativeBorder = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 15px;
  pointer-events: none;
  opacity: 0.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-width: 1px;
  }
`;


const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
`;

const EventDetails = ({ mass, reception, location, dressCode, registry }) => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  const mapOptions = {
    center: location,
    zoom: 15,
    styles: [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          { saturation: -100 },
          { hue: "#009900" }
        ]
      }
    ]
  };

  return (
    <EventContainer>
      <DetailCard style={fadeIn}>
        <DecorativeBorder />
        <EventTitle>Misa</EventTitle>
        <EventTime>a las {mass.time}</EventTime>
        <VenueName>{mass.venue}</VenueName>
      </DetailCard>

      <DetailCard style={fadeIn}>
        <DecorativeBorder />
        <EventTitle>Salon</EventTitle>
        <EventTime>a las {reception.time}</EventTime>
        <VenueName>{reception.venue}</VenueName>
        <Address>{reception.address}</Address>
        
        
        <MapContainer>
          <MapIframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234.7983654329079!2d-99.23093912891814!3d19.67965151068339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d21fa6fb2589b9%3A0xe5db3a99b81ac9ba!2sLa%20Finca%20del%20Agave!5e0!3m2!1ses-419!2smx!4v1738211958096!5m2!1ses-419!2smx`}
          allowFullScreen
        />
        </MapContainer>

        
        <MapLink 
          href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          ¿Cómo llegar?
        </MapLink>
      </DetailCard>

      <DetailCard style={fadeIn}>
        <DecorativeBorder />
        <EventTitle>Vestimenta</EventTitle>
        <Address>{dressCode}</Address>
      </DetailCard>

      <DetailCard style={fadeIn}>
        <DecorativeBorder />
        <EventTitle>Regalos</EventTitle>
        <Address>{registry}</Address>
      </DetailCard>
    </EventContainer>
  );
};

export default EventDetails;
