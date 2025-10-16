import './App.css'
import { useState } from 'react'
import { ContactsProvider, useContactsContext } from './context/ContactsProvider';
import SearchBar from './components/SearchBar';
import CategorySidebar from './components/CategorySidebar';
import ContactList from './components/ContactList';
import Toast from './components/Toast';
import ContactForm from './components/ContactForm';
import ConfirmDialog from './components/ConfirmDialog';

function TopBar({ onAdd, onOpenDrawer }: { onAdd: () => void; onOpenDrawer: () => void }) {
  const { searchQuery, setSearchQuery, filteredAndSortedContacts } = useContactsContext();
  return (
    <div className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-40">
      <div className="flex-1 gap-2">
        <button className="btn btn-ghost btn-square sm:hidden" aria-label="Open menu" onClick={onOpenDrawer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </button>
        <span className="text-xl font-bold">Contacts</span>
        <span className="ml-2 badge badge-info badge-outline hidden xs:inline-flex">
          {filteredAndSortedContacts.length}
        </span>
      </div>
      <div className="flex-none gap-3 items-center">
        <div className="w-80 max-w-xs hidden md:block">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <button className="btn btn-primary" onClick={onAdd}>Add</button>
      </div>
    </div>
  );
}

function AppInner() {
  const { searchQuery, setSearchQuery, toasts, deleteContact, contacts } = useContactsContext();
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [openConfirm, setOpenConfirm] = useState<{ id: string } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="drawer lg:drawer-open min-h-dvh">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" checked={drawerOpen} onChange={(e) => setDrawerOpen(e.target.checked)} />
      <div className="drawer-content">
        <TopBar onAdd={() => { setEditId(null); setOpenForm(true); }} onOpenDrawer={() => setDrawerOpen(true)} />
        <div className="px-4 py-4 md:hidden">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <main className="px-4 pb-24">
          <div className="mx-auto max-w-7xl">
            <ContactList
              onEdit={(id) => { setEditId(id); setOpenForm(true); }}
              onRequestDelete={(id) => setOpenConfirm({ id })}
              onAdd={() => { setEditId(null); setOpenForm(true); }}
            />
          </div>
        </main>
        <button
          className="btn btn-primary btn-circle fixed right-4 bottom-20 md:hidden shadow-lg"
          aria-label="Add contact"
          onClick={() => { setEditId(null); setOpenForm(true); }}
        >
          +
        </button>
      </div>
      <div className="drawer-side z-30">
        <label htmlFor="app-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={() => setDrawerOpen(false)}></label>
        <div className="w-80 bg-base-100 border-r border-base-200 min-h-full p-0">
          <div className="sticky top-0 bg-base-100 p-4 border-b border-base-200 hidden lg:block">
            <span className="font-semibold">Filters</span>
          </div>
          <div className="p-4">
            <CategorySidebar />
          </div>
        </div>
      </div>

      <ContactForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        initial={editId ? (contacts.find(c => c.id === editId) ?? null) : null}
      />
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
