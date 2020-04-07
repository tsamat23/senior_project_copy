export const filterNotifications = notifications => (
  notifications.filter(notification => {
    if (notification.showed === false && notification.review === false || notification.showed === true && notification.review === false) {
      return notification;
    }
  })
);