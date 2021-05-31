import { MessageM, UserFb } from 'types/Models/';

export type Message = MessageM;
export type User = UserFb;
export interface MessageState {
  messages: Message[];
  filteredMessages: Message[];
  loaded: boolean;
  activeUsers: UserFb[];
}
export type FetchMessages = (channelList: Message[]) => void;
export type FetchUser = (userList: User[]) => void;
export type UpdateUserStatus = (uid: string, online: boolean) => void;
