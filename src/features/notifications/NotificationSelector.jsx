export const selectRecentNotifications = (state) =>
  state.notifications.recentNotifications || [];
export const selectAllNotifications = (state) =>
  state.notifications.allNotifications || [];
export const selectNotificationsPageable = (state) =>
  state.notifications.pageable;
export const selectSelectedNotification = (state) =>
  state.notifications.selectedNotification;
export const selectUnreadCount = (state) =>
  (state.notifications.allNotifications || []).filter((n) => !n.is_seen).length;
export const selectNotificationTypes = (state) =>
  state.notifications.notificationTypes || [];
export const selectTotalNotifications = (state) =>
  state.notifications?.totalNotifications ?? 0;
