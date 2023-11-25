import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

const Navbar = () => {
  const {activityStore} = useStore();
  
  return (
    <Menu inverted fixed={'top'} >
      <Container>
        <Menu.Item>
          <img src='/assets/logo.png' alt='logo' style={{marginRight: '1rem'}} />
          <span>Reactivities</span>
        </Menu.Item>
        <Menu.Item name={'Activities'} />
        <Menu.Item>
          <Button positive content={'Create Activity'} onClick={() => activityStore.openForm()} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
