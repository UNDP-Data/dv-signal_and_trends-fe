import { createContext } from 'react';
import { CardsToPrintDataType, ChoicesDataType, CtxDataType } from '../Types';

const Context = createContext<CtxDataType>({
  userName: undefined,
  name: undefined,
  unit: undefined,
  role: undefined,
  isAcceleratorLab: undefined,
  accessToken: undefined,
  expiresOn: undefined,
  userID: undefined,
  notificationText: undefined,
  choices: undefined,
  cardsToPrint: [],
  updateUserName: (_d?: string) => {},
  updateName: (_d?: string) => {},
  updateUnit: (_d?: string) => {},
  updateIsAcceleratorLab: (_d?: boolean) => {},
  updateAccessToken: (_d?: string) => {},
  updateUserID: (_d?: number) => {},
  updateRole: (_d?: 'Admin' | 'Curator' | 'User') => {},
  updateExpiresOn: (_d: Date) => {},
  updateNotificationText: (_d?: string) => {},
  updateChoices: (_d?: ChoicesDataType) => {},
  updateCardsToPrint: (_d: CardsToPrintDataType[]) => {},
});

export default Context;
