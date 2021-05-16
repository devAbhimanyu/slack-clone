import { AuthState } from './auth';
import { ChannelState } from './channels';
import { MessageState } from './messages';
export type RootReducer = {
  auth: AuthState;
  channel: ChannelState;
  messages: MessageState;
};
