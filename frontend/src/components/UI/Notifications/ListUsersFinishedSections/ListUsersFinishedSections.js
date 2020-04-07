import React from 'react';

import UserFinishedSection from "../../../Users/UserFinishedSection/UserFinishedSection";

const ListUsersFinishedSections = ({ notifications }) => {
  return notifications.map(notification => {
    return <UserFinishedSection
      key={notification && notification._id}
      sectionId={notification && notification.sectionId._id}
      userId={notification && notification.userId._id}
      displayName={notification && notification.userId.displayName}
      sectionTitle={notification && notification.sectionId.title}
    />
  });
};

export default ListUsersFinishedSections;