import { Button, Container, Menu } from 'semantic-ui-react';

type NavbarType = {
  openForm: () => void;
}

const Navbar = ({openForm}: NavbarType) => {
  return (
    <Menu inverted fixed={'top'} >
      <Container>
        <Menu.Item>
          <img src='/assets/logo.png' alt='logo' style={{marginRight: '1rem'}} />
          <span>Reactivities</span>
        </Menu.Item>
        <Menu.Item name={'Activities'} />
        <Menu.Item>
          <Button positive content={'Create Activity'} onClick={() => openForm()} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
