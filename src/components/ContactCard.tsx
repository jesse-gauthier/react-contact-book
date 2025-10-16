import type { Contact, Category } from '../types';

export interface ContactCardProps {
  contact: Contact;
  category?: Category | null;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function ContactCard({ contact, category, onEdit, onDelete, onToggleFavorite }: ContactCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm hover:shadow transition-shadow">
      <div className="card-body gap-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="card-title leading-tight">{contact.name}</h3>
            <div className="text-sm text-base-content/60">{contact.email}</div>
            {contact.phone ? <div className="text-sm text-base-content/60">{contact.phone}</div> : null}
            {category ? <div className={`badge badge-${category.color} mt-2`}>{category.name}</div> : null}
          </div>
          <button className={`btn btn-sm ${contact.favorite ? 'btn-warning' : ''}`} onClick={() => onToggleFavorite(contact.id)} title="Toggle favorite">
            ★
          </button>
        </div>
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-outline btn-sm" onClick={() => onEdit(contact)}>Edit</button>
          <button className="btn btn-error btn-sm" onClick={() => onDelete(contact.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}


