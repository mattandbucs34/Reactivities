import { useEffect, Fragment } from 'react'

import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Navbar from './Navbar';

import { Container } from 'semantic-ui-react';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();
  const { loadActivities } = activityStore;


  useEffect(() => {
    loadActivities();
  }, [activityStore]);

  if (activityStore.isInitialLoading) {
    return <LoadingComponent content={'Loading App'} />;
  }

  return (
    <Fragment>
      <Navbar />
      <Container style={{marginTop: '7rem'}}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App);
