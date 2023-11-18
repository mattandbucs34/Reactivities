import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/interfaces/IActivity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

type ActivityDashboardType = {
  activities: IActivity[];
  isEditMode: boolean;
  isSubmitting: boolean;
  selectedActivity: IActivity | undefined;
  cancelSelectActivity: () => void;
  createOrEdit: (activity: IActivity) => void;
  closeForm: () => void;
  deleteActivity: (id: string) => void;
  openForm: (id: string) => void;
  selectActivity: (id: string) => void;
};

const ActivityDashboard = ({activities, isEditMode, isSubmitting,selectedActivity, closeForm, createOrEdit, deleteActivity, openForm, selectActivity, cancelSelectActivity}: ActivityDashboardType) => {
  return (
    <Grid>
      <Grid.Column width={'10'}>
        <ActivityList
          activities={activities}
          deleteActivity={deleteActivity}
          selectActivity={selectActivity}
          isSubmitting={isSubmitting}
        />
      </Grid.Column>
      <Grid.Column width={'6'} >
        {selectedActivity && !isEditMode &&
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        }
        {isEditMode &&
          <ActivityForm
            activity={selectedActivity}
            isSubmitting={isSubmitting}
            closeForm={closeForm}
            createOrEdit={createOrEdit}
          />
        }
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
