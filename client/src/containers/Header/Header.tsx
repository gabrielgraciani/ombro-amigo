import { ReactElement } from 'react';
import { FiUser } from 'react-icons/fi';

import { Container, Indent, Logo, Menu, Perfil } from './Header.styles';

const Header = (): ReactElement => {
  return (
    <Container>
      <Indent>
        <Logo>Ombro amigo</Logo>

        <Menu>menu</Menu>

        <Perfil>
          <FiUser size="2rem" />
        </Perfil>
      </Indent>
    </Container>
  );
};

export default Header;
