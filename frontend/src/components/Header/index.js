import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Container, Content, Navigation, Profile } from './styles';
import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/fastfeet-logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="FastFeet" />
        <Navigation>
          <NavLink to="/delivery">ENCOMENDAS</NavLink>
          <NavLink to="/deliveryman">ENTREGADORES</NavLink>
          <NavLink to="/recipient">DESTINATÁRIOS</NavLink>
          <NavLink to="/deliveryProblem">PROBLEMAS</NavLink>
        </Navigation>
      </Content>

      <aside>
        <Profile>
          <div>
            <strong>{profile.name}</strong>
            <button type="button" onClick={handleSignOut}>
              Sair do sistema
            </button>
          </div>
        </Profile>
      </aside>
    </Container>
  );
}
