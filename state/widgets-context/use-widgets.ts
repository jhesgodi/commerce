import { notifyError } from 'lib/utils/errors';
import { useContext } from 'react';
import { WidgetsContext } from '.';

export const useWidgets = () => {
  const context = useContext(WidgetsContext);
  if (context === undefined) {
    const error = new Error('useWidgets must be used within a WidgetsContext.Provider');
    notifyError(error);
    throw error;
  }
  return [context.state, context.dispatch] as const;
};
