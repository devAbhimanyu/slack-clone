import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'config/firebase.prod';
import {
  ChannelInstance,
  Notification,
  AddNotificationForChannel,
  StringToVoidFunc,
  RootReducer,
  ChannelState,
} from 'types';
const messageRef = firebase.database().ref('messages');

// let notifications: Notification[] = [];

type UseNotification = [
  AddNotificationForChannel,
  StringToVoidFunc,
  Notification[],
];

const useNotifications = (): UseNotification => {
  const notifications = useRef<Notification[]>([]);

  const { activeChannel } = useSelector<RootReducer, ChannelState>(
    (state) => state.channel,
  );

  const [notificationsState, setNotificationState] = useState<Notification[]>(
    [],
  );

  useEffect(() => {
    setNotificationState(notifications.current);
  }, [notifications.current]);

  const handleNotifications = (
    channelId: string,
    snap: firebase.database.DataSnapshot,
  ) => {
    let lastTotal = 0;
    const notificationsCopy = notifications.current.map((notification) => ({
      ...notification,
    }));
    const index = notificationsCopy.findIndex(
      (notification) => notification.id === channelId,
    );

    if (index !== -1) {
      if (channelId !== activeChannel?.id) {
        lastTotal = notificationsCopy[index].total;

        if (snap.numChildren() - lastTotal > 0) {
          notificationsCopy[index].count = snap.numChildren() - lastTotal;
        }
      }
      notificationsCopy[index].lastKnownTotal = snap.numChildren();
    } else {
      notificationsCopy.push({
        id: channelId,
        total: snap.numChildren(),
        lastKnownTotal: snap.numChildren(),
        count: 0,
      });
    }
    notifications.current = [...notificationsCopy];
  };

  const addNotificationToChannel = (
    channelId: string,
    activeChannel: ChannelInstance,
  ) => {
    messageRef.child(channelId).on('value', (snap) => {
      if (activeChannel) {
        handleNotifications(channelId, snap);
      }
    });
  };

  const clearNotifications = (channelId: string) => {
    const notificationsCopy = notifications.current.map((notification) => ({
      ...notification,
    }));
    const index = notificationsCopy.findIndex(
      (notification) => notification.id === channelId,
    );
    if (index !== -1) {
      notificationsCopy[index].total =
        notificationsCopy?.[index]?.lastKnownTotal;
      notificationsCopy[index].count = 0;
      notifications.current = [...notificationsCopy];
    }
  };

  return [addNotificationToChannel, clearNotifications, notificationsState];
};

export default useNotifications;
