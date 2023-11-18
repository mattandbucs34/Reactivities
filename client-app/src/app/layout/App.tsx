import { useEffect, useState, Dispatch, SetStateAction, Fragment } from 'react'
import {v4 as uuid} from 'uuid';

import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Navbar from './Navbar';

import { Container } from 'semantic-ui-react';
import { IActivity } from '../interfaces/IActivity';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities]: [IActivity[], Dispatch<SetStateAction<IActivity[]>>] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity]: [IActivity | undefined, Dispatch<SetStateAction<IActivity | undefined>>] = useState();
  const [isEditMode, setIsEditMode]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [isLoading, setIsLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
  const [isSubmitting, setIsSubmitting]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        const activities: IActivity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(response);
        setIsLoading(false);
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
    setIsSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setIsEditMode(false);
        setIsSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
      });
      setSelectedActivity(activity);
      setIsEditMode(false);
      setIsSubmitting(false);
    }
  }

  function handleDeleteActivity(id: string) {
    setIsSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setIsSubmitting(false);
    });
  }

  if (isLoading) {
    return <LoadingComponent content={'Loading App'} />;
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
          isSubmitting={isSubmitting}
        />

      </Container>
    </Fragment>
  );
}

export default App;
