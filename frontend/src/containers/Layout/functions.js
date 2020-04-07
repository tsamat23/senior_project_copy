export const countActiveNotifications = notifications => {
  const activeNotifications = notifications.filter(notification => notification.showed === false);
  return activeNotifications.length;
};