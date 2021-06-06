import {
  StringToVoidFunc,
  AddNotificationForChannel,
  Notification,
} from 'types';
import { ChannelInstance } from './store';

export type UseNotification = [
  AddNotificationForChannel,
  StringToVoidFunc,
  Notification[],
];

export type UseFavourite = [
  (channel: ChannelInstance, favCheck: boolean) => void,
  ChannelInstance[],
];
