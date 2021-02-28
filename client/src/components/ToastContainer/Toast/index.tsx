/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { removeToast } from 'redux/toast/actions';
import { Toast as ToastState } from 'redux/toast/types';

import { Container } from './styles';

interface ToastProps {
  message: ToastState;
  style: Record<string, unknown>;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(message.id));
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, message.id]);

  return (
    <Container
      type={message.type}
      description={message.description}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => dispatch(removeToast(message.id))} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
