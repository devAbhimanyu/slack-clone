import { AuthState } from './auth';
import { ChannelState } from './channels';
export type RootReducer = {
  auth: AuthState;
  channel: ChannelState;
};
