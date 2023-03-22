import { createContext } from 'react';
import { CtxDataType } from '../Types';

const Context = createContext<CtxDataType>({
  userName: undefined,
  name: undefined,
  unit: undefined,
  role: undefined,
  updateUserName: (_d?: string) => {},
  updateName: (_d?: string) => {},
  updateUnit: (_d?: string) => {},
  updateRole: (_d?: 'Admin' | 'Curator' | 'Visitor') => {},
});

export default Context;
