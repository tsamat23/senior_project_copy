import React from 'react';
import List from '@material-ui/core/List';
import {returnUser} from '../../../containers/Users/functions';
import Paper from "../../UI/Paper/Paper";


const UsersList = ({ users }) => (
  <List>
    {users === null
      ? <Paper
        header="Нет пользователей"
        text="В базе данных не найдено ни одного пользователя"
      />
      : users.map(user => returnUser(user))}
  </List>
);

export default UsersList;