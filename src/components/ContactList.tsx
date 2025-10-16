import ContactCard from './ContactCard';
import { useContactsContext } from '../context/ContactsProvider';

export interface ContactListProps {
  onEdit: (id: string) => void;
  onRequestDelete: (id: string) => void;
}

export default function ContactList({ onEdit, onRequestDelete }: ContactListProps) {
  const { filteredAndSortedContacts, categories, toggleFavorite } = useContactsContext();

  if (!filteredAndSortedContacts.length) {
    return (
      <div className="text-center text-base-content/60 py-10">
        No contacts yet. Click "Add Contact" to get started.
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


