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
      <div className="flex flex-col items-center justify-center text-center text-base-content/60 py-16">
        <div className="mb-4 opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12">
            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4Zm0 2c-3.33 0-6 2.67-6 6h12c0-3.33-2.67-6-6-6Z" />
          </svg>
        </div>
        <div className="text-lg">No contacts yet</div>
        <div className="text-sm mb-4">Tap Add to create your first contact</div>
        {onAdd ? <button className="btn btn-primary" onClick={onAdd}>Add Contact</button> : null}
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


