import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { IActivity } from '../../../app/interfaces/IActivity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

type ActivityListType = {
  activities: IActivity[];
  isSubmitting: boolean;
  deleteActivity: (id: string) => void;
  selectActivity: (id: string) => void;
}

const ActivityList = ({activities, isSubmitting, deleteActivity, selectActivity}: ActivityListType) => {

  const [target, setTarget]: [string, Dispatch<SetStateAction<string>>] = useState('');

  function handleActivityDelete(e: MouseEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activities.map(activity => {
          return (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as={'a'}>
                  {activity.title}
                </Item.Header>
                <Item.Meta>
                  {activity.date}
                </Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>{activity.city}, {activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    floated={'right'}
                    content={'View'}
                    color={'blue'}
                    onClick={() => selectActivity(activity.id)}
                  />
                  <Button
                    name={activity.id}
                    floated={'right'}
                    content={'Delete'}
                    color={'red'}
                    loading={isSubmitting && target === activity.id}
                    onClick={(e) => handleActivityDelete(e, activity.id)}
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        })}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
