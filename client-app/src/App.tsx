import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
      }).catch((e) => {
        console.log(e);
      })
  }, []);

  return (
    <div>
      <Header as={'h2'} icon={'users'} content={'Reactivities'} />
      <List>
        {activities.map(activity => {
          return (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          )
        })}
      </List>
    </div>
  );
}

export default App;
