import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/interfaces/IActivity";

type ActivityFormType = {
  activity: IActivity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: IActivity) => void;
}

const ActivityForm = ({activity: selectedActivity, closeForm, createOrEdit}: ActivityFormType) => {

  const initialState: IActivity | undefined = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  };

  const [activity, setActivity]: [IActivity, Dispatch<SetStateAction<IActivity>>] = useState(initialState);

  function handleSubmit() {
    createOrEdit(activity);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target;
    setActivity({...activity, [name]: value});
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete={'off'}>
        <Form.Input
          placeholder='Title'
          name={'title'}
          value={activity.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        />
        <Form.TextArea
          placeholder='Description'
          name={'description'}
          value={activity.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e)}
        />
        <Form.Input
          placeholder='Category'
          name={'category'}
          value={activity.category}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        />
        <Form.Input
          placeholder='Date'
          name={'date'}
          value={activity.date}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        />
        <Form.Input
          placeholder='City'
          name={'city'}
          value={activity.city}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        />
        <Form.Input
          placeholder='Venue'
          name={'venue'}
          value={activity.venue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        />
        <Button
          floated={'right'}
          positive
          type={'submit'}
          content={'Submit'}
          onClick={handleSubmit}
        />
        <Button
          floated={'right'}
          type={'button'}
          content={'Cancel'}
          onClick={() => closeForm()}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
