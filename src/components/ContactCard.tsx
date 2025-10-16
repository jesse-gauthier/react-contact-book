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
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 group">
      <div className="card-body gap-3 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            <div className="min-w-0 flex-1">
              <h3 className="card-title leading-tight text-lg font-bold mb-0.5 truncate text-base-content">{contact.name}</h3>
              <div className="text-sm text-base-content/70 truncate mb-0.5 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 min-w-0 truncate">
                  <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{contact.email}</span>
                </span>
                {contact.phone ? (
                  <>
                    <span className="opacity-40">•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {contact.phone}
                    </span>
                  </>
                ) : null}
              </div>
              {category ? (
                <div className={`badge badge-${category.color} mt-2 shadow-sm`}>
                  {category.name}
                </div>
              ) : null}
            </div>
          </div>
          <button
            className={`btn btn-sm btn-circle shrink-0 ${contact.favorite ? 'btn-warning shadow-lg shadow-warning/50' : 'btn-ghost'} transition-all duration-300`}
            onClick={() => onToggleFavorite(contact.id)}
            title="Toggle favorite"
            aria-pressed={contact.favorite}
            aria-label={contact.favorite ? 'Unfavorite contact' : 'Favorite contact'}
          >
            <span className={`text-lg transition-transform ${contact.favorite ? 'scale-125' : ''}`}>★</span>
          </button>
        </div>
        <div className="card-actions justify-end mt-1 gap-2">
          <button className="btn btn-primary btn-sm flex-1 sm:flex-initial shadow-md" onClick={() => onEdit(contact)} aria-label={`Edit ${contact.name}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button className="btn btn-error btn-sm flex-1 sm:flex-initial shadow-md" onClick={() => onDelete(contact.id)} aria-label={`Delete ${contact.name}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}


