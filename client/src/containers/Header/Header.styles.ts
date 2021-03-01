import styled from 'styled-components';

const Container = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid ${props => props.theme.colors.lightGray};
`;

const Perfil = styled.div``;

const Menu = styled.div`
  flex-grow: 1;
`;

const Logo = styled.div``;

export { Container, Logo, Menu, Perfil };
