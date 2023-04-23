import { createContext } from 'react';
import { CtxDataType } from '../Types';

const Context = createContext<CtxDataType>({
  userName: undefined,
  name: undefined,
  unit: undefined,
  role: undefined,
  accessToken: undefined,
  expiresOn: undefined,
  updateUserName: (_d?: string) => {},
  updateName: (_d?: string) => {},
  updateUnit: (_d?: string) => {},
  updateAccessToken: (_d?: string) => {},
  updateRole: (_d?: 'Admin' | 'Curator' | 'Visitor') => {},
  updateExpiresOn: (_d: Date) => {},
});

export default Context;
