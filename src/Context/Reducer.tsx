/* eslint-disable @typescript-eslint/no-explicit-any */
export default (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_USERNAME':
      return { ...state, userName: action.payload };
    case 'UPDATE_NAME':
      return { ...state, name: action.payload };
    case 'UPDATE_UNIT':
      return { ...state, unit: action.payload };
    case 'UPDATE_ROLE':
      return { ...state, role: action.payload };
    default:
      return { ...state };
  }
};
