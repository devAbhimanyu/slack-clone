import { UserFb } from './User';

export interface Channel {
  name: string;
  details: string;
  id?: string;
  createdBy: UserFb;
}
