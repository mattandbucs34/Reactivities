import { useEffect, useState, Dispatch, SetStateAction, Fragment } from 'react'
import axios from 'axios';
import {v4 as uuid} from 'uuid';

import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Navbar from './Navbar';

import { Container } from 'semantic-ui-react';
import { IActivity } from '../interfaces/IActivity';

function App() {
  const [activities, setActivities]: [IActivity[], Dispatch<SetStateAction<IActivity[]>>] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity]: [IActivity | undefined, Dispatch<SetStateAction<IActivity | undefined>>] = useState();
  const [isEditMode, setIsEditMode]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
      }).catch((e) => {
        console.log(e);
      })
  }, []);

  function handleSelectActivity(id: string) {
    const activity = activities.find(activity => activity.id === id);
    setSelectedActivity(activity);
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setIsEditMode(true);
  }

  function handleFormClose() {
    setIsEditMode(false);
  }

  function handleCreateOrEditActivity(activity: IActivity) {
    activity.id ? 
    setActivities([...activities.filter(x => x.id !== activity.id)]) :
    setActivities([...activities, {...activity, id: uuid()}]);
    setIsEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    const updatedActivities = activities.filter(activity => activity.id === id);
    setActivities(updatedActivities);
  }

  return (
    <Fragment>
      <Navbar openForm={handleFormOpen} />
      <Container style={{marginTop: '7rem'}}>
        <ActivityDashboard
          activities={activities}
          isEditMode={isEditMode}
          selectedActivity={selectedActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          createOrEdit={handleCreateOrEditActivity}
          closeForm={handleFormClose}
          deleteActivity={handleDeleteActivity}
          openForm={handleFormOpen}
          selectActivity={handleSelectActivity}
        />

      </Container>
    </Fragment>
  );
}

export default App;
