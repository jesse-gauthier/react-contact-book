import './App.css'
import { useState } from 'react'
import { ContactsProvider, useContactsContext } from './context/ContactsProvider';
import SearchBar from './components/SearchBar';
import CategorySidebar from './components/CategorySidebar';
import ContactList from './components/ContactList';
import Toast from './components/Toast';
import ContactForm from './components/ContactForm';
import ConfirmDialog from './components/ConfirmDialog';

function TopBar({ onAdd }: { onAdd: () => void }) {
  const { searchQuery, setSearchQuery, filteredAndSortedContacts } = useContactsContext();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <span className="text-xl font-bold">Contact Book</span>
        <span className="ml-3 badge badge-info badge-outline">
          {filteredAndSortedContacts.length} contacts
        </span>
      </div>
      <div className="flex-none gap-2 items-center">
        <div className="w-80 max-w-xs hidden sm:block">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <button className="btn btn-primary" onClick={onAdd}>Add Contact</button>
      </div>
    </div>
  );
}

function AppInner() {
  const { searchQuery, setSearchQuery, toasts, deleteContact } = useContactsContext();
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState<{ id: string } | null>(null);
  return (
    <div className="min-h-dvh">
      <TopBar onAdd={() => setOpenForm(true)} />
      <div className="p-4 sm:hidden">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-[16rem_1fr] gap-4">
          <CategorySidebar />
          <ContactList />
        </div>
      </main>
      <ContactForm open={openForm} onClose={() => setOpenForm(false)} />
      <ConfirmDialog
        open={Boolean(openConfirm)}
        title="Delete contact?"
        description="This action cannot be undone."
        onCancel={() => setOpenConfirm(null)}
        onConfirm={() => {
          if (openConfirm) deleteContact(openConfirm.id);
          setOpenConfirm(null);
        }}
      />
      <Toast toasts={toasts} />
    </div>
  );
}

function App() {
  return (
    <ContactsProvider>
      <AppInner />
    </ContactsProvider>
  );
}

export default App
