import React from 'react';
import Unknown from '../../assets/users/unknown.png';
import User from '../../components/Users/User/User';

export const returnUser = user => (
  <User key={user._id}
        id={user._id}
        displayName={user.displayName}
        avatar={user.avatar ? user.avatar : Unknown}
  />
);