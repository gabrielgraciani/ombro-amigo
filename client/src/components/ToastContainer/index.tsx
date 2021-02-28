import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';
import { Toast as ToastState } from '../../redux/toast/types';

import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastState[];
}

// eslint-disable-next-line react/prop-types
const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
