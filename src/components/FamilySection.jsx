import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const FamilyContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FamilyGroup = styled(animated.div)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FamilyTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Names = styled.p`
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  line-height: 1.6;
`;

const FamilySection = ({ parents, godparents }) => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  return (
    <FamilyContainer>
      <Title>Con la bendición de:</Title>
      
      <FamilyGroup style={fadeIn}>
        <FamilyTitle>Mis Padres</FamilyTitle>
        <Names>
          {parents.father}<br />
          {parents.mother}
        </Names>
      </FamilyGroup>

      <FamilyGroup style={fadeIn}>
        <FamilyTitle>Mis Padrinos</FamilyTitle>
        <Names>
          {godparents.godfather}<br />
          {godparents.godmother}
        </Names>
      </FamilyGroup>
    </FamilyContainer>
  );
};

export default FamilySection;
