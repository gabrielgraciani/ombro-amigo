import styled from 'styled-components';

const Container = styled.header`
  width: 100%;

  border-bottom: 0.1rem solid ${props => props.theme.colors.lightGray};
`;

const Indent = styled.div`
  display: flex;
  align-items: center;
  max-width: 132rem;
  padding: 1rem;
`;

const Perfil = styled.div`
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  flex-grow: 1;
`;

const Logo = styled.div`
  font-size: 1.8rem;
`;

export { Container, Indent, Logo, Menu, Perfil };
