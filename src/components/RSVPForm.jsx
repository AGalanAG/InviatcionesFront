import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';


const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    align-items: flex-start;
    padding-top: 10vh;
  }
`;

const FormContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.lg};
    max-height: 80vh;
  }

  /* Estilizar la barra de desplazamiento */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: ${({ theme }) => theme.animations.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: ${({ theme }) => theme.spacing.sm};
    right: ${({ theme }) => theme.spacing.sm};
    font-size: 1.2rem;
  }
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.8rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: 1.1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: 1rem;
  transition: ${({ theme }) => theme.animations.transition};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(11, 75, 60, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.tertiary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: 1rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.animations.transition};
  margin-top: ${({ theme }) => theme.spacing.md};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: 1rem;
  }
`;

const Confirmation = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};

  h3 {
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    font-family: ${({ theme }) => theme.fonts.tertiary};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};

    h3 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: 1rem;
  transition: ${({ theme }) => theme.animations.transition};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(11, 75, 60, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: 0.9rem;
  }
`;

// Agregar estos componentes styled
const ErrorBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const NoteText = styled.small`
  display: block;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
`;

const LoadingSpinner = styled.div`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto;
`;

const RSVPForm = ({ isOpen, onClose, onSubmit, loading, error }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactMethod, setContactMethod] = useState('whatsapp');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      let contactInfo = data.contactInfo;
      
      // Validación mejorada del número WhatsApp
      if (contactMethod === 'whatsapp') {
        const cleanedNumber = contactInfo.replace(/[^\d]/g, '');
        contactInfo = `52${cleanedNumber}`;
      }

      const formattedData = {
        fullName: data.fullName.trim(),
        contactMethod: contactMethod,
        contactInfo: contactInfo,
        guests: parseInt(data.guests, 10)
      };
      
      await onSubmit(formattedData);
      setIsSubmitted(true);
      
      // Cierre automático después de 3 segundos
      setTimeout(() => {
        onClose();
        reset();
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting RSVP:', error);
    }
  };

  const validateEmail = (value) => {
    const validDomains = ['gmail.com', 'outlook.com', 'hotmail.com'];
    const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@(${validDomains.join('|')})$`, 'i');
    return emailRegex.test(value) || 'Dominio no válido (aceptamos Gmail, Outlook o Hotmail)';
  };

  const validateWhatsApp = (value) => {
    const cleanedValue = value.replace(/[^\d]/g, '');
    return (cleanedValue.length === 10 && /^\d+$/.test(cleanedValue)) || 
           'Ingresa 10 dígitos sin espacios ni caracteres especiales';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <FormContainer
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <CloseButton onClick={onClose}>&times;</CloseButton>

            {!isSubmitted ? (
              <>
                <Title>Confirma tu Asistencia</Title>
                {error && (
                  <ErrorBanner>
                    {error.includes('registrado') 
                      ? 'Ya tienes una confirmación registrada' 
                      : 'Error al procesar tu solicitud'}
                  </ErrorBanner>
                )}
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                  <FormGroup>
                    <Label>Nombre Completo</Label>
                    <Input
                      {...register('fullName', { 
                        required: 'Campo obligatorio',
                        maxLength: {
                          value: 100,
                          message: 'Máximo 100 caracteres'
                        }
                      })}
                      placeholder="Ej. María Guadalupe Pérez García"
                    />
                    {errors.fullName && (
                      <ErrorMessage>{errors.fullName.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>Método de contacto</Label>
                    <Select
                      value={contactMethod}
                      onChange={(e) => {
                        setContactMethod(e.target.value);
                        reset({ contactInfo: '' });
                      }}
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>{contactMethod === 'email' ? 'Correo electrónico' : 'Número de WhatsApp'}</Label>
                    <Input
                      {...register('contactInfo', {
                        required: 'Campo obligatorio',
                        validate: contactMethod === 'email' ? validateEmail : validateWhatsApp
                      })}
                      type={contactMethod === 'email' ? 'email' : 'tel'}
                      placeholder={contactMethod === 'email' 
                        ? 'ejemplo@gmail.com' 
                        : '55 1234 5678'}
                    />
                    {errors.contactInfo && (
                      <ErrorMessage>{errors.contactInfo.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  {contactMethod === 'whatsapp' && (
                    <NoteText>
                      * Ingresa tu número de 10 dígitos sin espacios ni código de país
                    </NoteText>
                  )}

                  <FormGroup>
                    <Label>Número de asistentes</Label>
                    <Input
                      type="number"
                      {...register('guests', {
                        required: 'Campo obligatorio',
                        min: { 
                          value: 1, 
                          message: 'Mínimo 1 persona (incluyéndote)' 
                        },
                        max: { 
                          value: 10, 
                          message: 'Máximo 10 acompañantes' 
                        }
                      })}
                      placeholder="Ej. 3"
                    />
                    {errors.guests && (
                      <ErrorMessage>{errors.guests.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <SubmitButton 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? (
                      <LoadingSpinner />
                    ) : (
                      'Confirmar Asistencia'
                    )}
                  </SubmitButton>
                </Form>
              </>
            ) : (
              <Confirmation
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3>¡Confirmación Exitosa! 🎉</h3>
                <p>Recibirás la confirmación en tu {contactMethod === 'email' ? 'correo' : 'WhatsApp'}</p>
              </Confirmation>
            )}
          </FormContainer>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default RSVPForm;
