import { createContext, useContext } from 'react';
import { useContacts } from '../hooks/useContacts';

type ContactsContextValue = ReturnType<typeof useContacts>;

const ContactsContext = createContext<ContactsContextValue | undefined>(undefined);

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const value = useContacts();
  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

export function useContactsContext(): ContactsContextValue {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error('useContactsContext must be used within ContactsProvider');
  return ctx;
}


