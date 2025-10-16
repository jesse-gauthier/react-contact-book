import ContactCard from './ContactCard';
import { useContactsContext } from '../context/ContactsProvider';

export interface ContactListProps {
  onEdit: (id: string) => void;
  onRequestDelete: (id: string) => void;
  onAdd?: () => void;
}

export default function ContactList({ onEdit, onRequestDelete, onAdd }: ContactListProps) {
  const { filteredAndSortedContacts, categories, toggleFavorite } = useContactsContext();

  if (!filteredAndSortedContacts.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-base-content/60 py-20 px-4">
        <div className="mb-6 relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shadow-xl animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-16 text-primary/60">
              <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4Zm0 2c-3.33 0-6 2.67-6 6h12c0-3.33-2.67-6-6-6Z" />
            </svg>
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-secondary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-base-content mb-2">No contacts yet</h3>
        <p className="text-base text-base-content/70 mb-6 max-w-md">Start building your contact list by adding your first contact. It's quick and easy!</p>
        {onAdd ? (
          <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl" onClick={onAdd}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Your First Contact
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredAndSortedContacts.map(c => (
        <ContactCard
          key={c.id}
          contact={c}
          category={categories.find(cat => cat.id === c.categoryId) ?? null}
          onEdit={() => onEdit(c.id)}
          onDelete={onRequestDelete}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}


