import { UserFb } from './User';

export interface MessageM {
  timestamp?: Object;
  user: UserFb;
  content: string;
}
