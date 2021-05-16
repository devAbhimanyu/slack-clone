import { MessageM } from 'types/Models/Message';

export type Message = MessageM;
export interface MessageState {
  messages: Message[];
  loaded: boolean;
}
export type FetchMessages = <T>(channelList: Message[]) => void;