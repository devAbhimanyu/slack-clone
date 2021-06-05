import { Channel } from '../Models/Chanel';
export interface ChannelState {
  channels?: Channel[];
  activeChannel: Channel | null;
  error?: any;
  loader: boolean;
  firstLoad: boolean;
  privateChannel: false;
}

export type ChannelInstance = Channel;

export type NewChannel = {
  channelName?: string;
  channelDetails?: string;
};

export type Notification = {
  id: string;
  total: number;
  lastKnownTotal: number;
  count: number;
};

export type AddNotificationForChannel = (
  channelId: string,
  activeChannel: ChannelInstance,
) => void;

export type FetchChannel = <T>(channelList: ChannelState['channels']) => void;
