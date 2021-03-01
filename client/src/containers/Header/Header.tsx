import { ReactElement } from 'react';
import { Container, Logo, Menu, Perfil } from './Header.styles';

const Header = (): ReactElement => {
  return (
    <Container>
      <Logo>Ombro amigo</Logo>

      <Menu>menu</Menu>

      <Perfil>perfil</Perfil>
    </Container>
  );
};

export default Header;
