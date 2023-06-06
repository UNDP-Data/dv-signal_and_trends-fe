import { createContext } from 'react';
import { ChoicesDataType, CtxDataType } from '../Types';

const Context = createContext<CtxDataType>({
  userName: undefined,
  name: undefined,
  unit: undefined,
  role: undefined,
  accessToken: undefined,
  expiresOn: undefined,
  userID: undefined,
  notificationText: undefined,
  choices: undefined,
  updateUserName: (_d?: string) => {},
  updateName: (_d?: string) => {},
  updateUnit: (_d?: string) => {},
  updateAccessToken: (_d?: string) => {},
  updateUserID: (_d?: number) => {},
  updateRole: (_d?: 'Admin' | 'Curator' | 'User') => {},
  updateExpiresOn: (_d: Date) => {},
  updateNotificationText: (_d?: string) => {},
  updateChoices: (_d?: ChoicesDataType) => {},
});

export default Context;
