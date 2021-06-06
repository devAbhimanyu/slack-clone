import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'config/firebase.prod';
import {
  Notification,
  StringToVoidFunc,
  RootReducer,
  ChannelState,
} from 'types';
const messageRef = firebase.database().ref('messages');

// let notifications: Notification[] = [];

type UseNotification = [StringToVoidFunc, Notification[]];
let channelAttachecd: string[] = [];

const useNotifications = (): UseNotification => {
  const notifications = useRef<Notification[]>([]);

  const { channels, activeChannel } = useSelector<RootReducer, ChannelState>(
    (state) => state.channel,
  );

  const [notificationsState, setNotificationState] = useState<Notification[]>(
    [],
  );

  // useEffect(() => {
  // }, [notifications.current]);

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
    setNotificationState(notifications.current);
  };

  useEffect(() => {
    if (channels?.length && activeChannel?.id) {
      channels.forEach((channel) => {
        const { id } = channel;
        if (!channelAttachecd.includes(id as string)) {
          channelAttachecd.push(id as string);
          messageRef.child(id as string).on('value', (snap) => {
            handleNotifications(id as string, snap);
          });
          console.log('channel id ', id);
        }
      });
    } else {
      channelAttachecd.length = 0;
    }
    return () => {
      if (channels)
        channels.forEach((channel) => {
          const { id } = channel;
          if (channelAttachecd.includes(id as string)) {
            messageRef.child(id as string).off();
            console.log('channel id removed', id);
            channelAttachecd = channelAttachecd.filter((ch) => ch !== id);
          }
        });
    };
  }, [channels, activeChannel]);

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

  return [clearNotifications, notificationsState];
};

export default useNotifications;
