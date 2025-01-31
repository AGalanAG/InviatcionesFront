import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { images } from '../assets';

const WelcomeContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  background-image: url(${images.backgroundPattern});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    background-size: 150% auto;
  }
`;

const GoldBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 20px solid ${({ theme }) => theme.colors.secondary};
  opacity: 0.2;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-width: 5px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 90%;
  margin: 0 auto;
  padding: clamp(${({ theme }) => theme.spacing.md}, 3vw, ${({ theme }) => theme.spacing.xl});
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 95%;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const InviteText = styled(animated.p)`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};
  letter-spacing: 2px;
  font-style: italic;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    letter-spacing: 1px;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const Title = styled(animated.h1)`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(3rem, 5vw, 5rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const Subtitle = styled(animated.h2)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(1.2rem, 3vw, 2rem);
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const DateText = styled(animated.p)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  margin: ${({ theme }) => theme.spacing.md} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: ${({ theme }) => theme.spacing.sm} 0;
  }
`;

const IllustrationWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: ${({ theme }) => theme.spacing.xl} auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 200px;
    margin: ${({ theme }) => theme.spacing.md} auto;
  }
`;

const DressIllustration = styled.img.attrs({
  src: images.dressIllustration,
  alt: "Quinceañera dress"
})`
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;
const Butterfly = styled(animated.img).attrs({
  src: images.butterfly,
  alt: "Decorative butterfly"
})`
  position: absolute;
  width: 15%;
  height: auto;
  ${({ position }) => position};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 20%;
  }
`;
const WelcomeSection = ({ parents, name, date, image }) => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  const butterflyAnimation = useSpring({
    from: { transform: 'translate(0px, 0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translate(10px, -10px)' });
        await next({ transform: 'translate(0px, 0px)' });
      }
    },
    config: { duration: 2000 },
  });

  return (
    <WelcomeContainer>
      <GoldBorder />
      <ContentWrapper>

        <Title style={fadeIn}>{name}</Title>
        <DateText style={fadeIn}>{date}</DateText>
        
        <IllustrationWrapper>
          <DressIllustration />
          <Butterfly 
            style={butterflyAnimation}
            position={{ top: '20%', right: '-5%' }}
          />
          <Butterfly
            style={butterflyAnimation}
            position={{ bottom: '30%', left: '-5%' }}
          />
        </IllustrationWrapper>
        <InviteText style={fadeIn}>
          Con la bendición de Dios y el amor de mi familia,
          te invito a celebrar conmigo este día tan especial
          en el que me convierto en mujer.
        </InviteText>
      </ContentWrapper>
    </WelcomeContainer>
  );
};

export default WelcomeSection;
