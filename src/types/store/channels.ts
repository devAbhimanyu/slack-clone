import { Channel } from '../Models/Chanel';

export interface ChannelState {
  channels?: Channel[];
  activeChannel: Channel | null;
  error?: any;
  loader: boolean;
  firstLoad: boolean;
}

export type ChannelInstance = Channel;

export type NewChannel = {
  channelName?: string;
  channelDetails?: string;
};

export type FetchChannel = (channelList: ChannelState['channels']) => void;