
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
    <div className="navbar bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/70 border-b border-base-200 sticky top-0 z-40 shadow-lg">
      <div className="navbar-start gap-3">
        <button className="btn btn-ghost btn-circle sm:hidden shadow-sm" aria-label="Open menu" onClick={onOpenDrawer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-primary-content" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Contacts</span>
            <span className="ml-2 badge badge-primary shadow-sm hidden xs:inline-flex">
              {filteredAndSortedContacts.length}
            </span>
          </div>
        </div>
      </div>
      <div className="navbar-center w-full max-w-xl px-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      <div className="navbar-end">
        <button className="btn btn-primary shadow-lg" onClick={onAdd}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </div>
  );
}

function AppInner() {
  const { toasts, deleteContact, contacts } = useContactsContext();
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [openConfirm, setOpenConfirm] = useState<{ id: string } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="drawer lg:drawer-open min-h-dvh">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" checked={drawerOpen} onChange={(e) => setDrawerOpen(e.target.checked)} />
      <div className="drawer-content">
        <TopBar onAdd={() => { setEditId(null); setOpenForm(true); }} onOpenDrawer={() => setDrawerOpen(true)} />
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
          className="btn btn-primary btn-circle btn-lg fixed right-6 bottom-6 md:hidden shadow-2xl hover:shadow-primary/50 z-50 border-2 border-primary-content/20"
          aria-label="Add contact"
          onClick={() => { setEditId(null); setOpenForm(true); }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
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
