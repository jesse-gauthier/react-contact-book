import { useEffect, useId, useState } from 'react';
import { useContactsContext } from '../context/ContactsProvider';
import type { Contact, ContactFormValues } from '../types';

export interface ContactFormProps {
  open: boolean;
  onClose: () => void;
  initial?: Contact | null;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ open, onClose, initial }: ContactFormProps) {
  const { categories, addContact, updateContact } = useContactsContext();
  const [values, setValues] = useState<ContactFormValues>({ name: '', email: '', phone: '', categoryId: null, favorite: false });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const id = useId();

  useEffect(() => {
    if (initial) {
      setValues({
        name: initial.name,
        email: initial.email,
        phone: initial.phone,
        categoryId: initial.categoryId,
        favorite: initial.favorite,
      });
    } else {
      setValues({ name: '', email: '', phone: '', categoryId: null, favorite: false });
    }
    setErrors({});
  }, [initial, open]);

  function validate(v: ContactFormValues): boolean {
    const next: Partial<Record<keyof ContactFormValues, string>> = {};
    if (!v.name.trim()) next.name = 'Name is required';
    if (!v.email.trim() || !emailPattern.test(v.email.trim())) next.email = 'Valid email required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    const trimmed: ContactFormValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      categoryId: values.categoryId,
      favorite: Boolean(values.favorite),
    };
    if (!validate(trimmed)) return;
    if (initial) {
      updateContact(initial.id, trimmed);
    } else {
      addContact(trimmed);
    }
    onClose();
  }

  return (
    <dialog className="modal backdrop-blur-sm" open={open}>
      <div className="modal-box max-w-md shadow-2xl border border-base-300/50 rounded-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{initial ? 'Edit Contact' : 'Add Contact'}</h3>
        </div>

        <div className="form-control mt-4">
          <label className="label" htmlFor={`${id}-name`}>
            <span className="label-text font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Name
            </span>
          </label>
          <input
            id={`${id}-name`}
            className={`input input-bordered shadow-md ${errors.name ? 'input-error' : ''}`}
            value={values.name}
            onChange={(e) => setValues(v => ({ ...v, name: e.target.value }))}
            placeholder="Enter full name..."
          />
          {errors.name ? <span className="text-error text-sm mt-1 ml-1 font-medium">{errors.name}</span> : null}
        </div>

        <div className="form-control mt-4">
          <label className="label" htmlFor={`${id}-email`}>
            <span className="label-text font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </span>
          </label>
          <input
            id={`${id}-email`}
            type="email"
            className={`input input-bordered shadow-md ${errors.email ? 'input-error' : ''}`}
            value={values.email}
            onChange={(e) => setValues(v => ({ ...v, email: e.target.value }))}
            placeholder="example@email.com"
          />
          {errors.email ? <span className="text-error text-sm mt-1 ml-1 font-medium">{errors.email}</span> : null}
        </div>

        <div className="form-control mt-4">
          <label className="label" htmlFor={`${id}-phone`}>
            <span className="label-text font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Phone
            </span>
          </label>
          <input
            id={`${id}-phone`}
            className="input input-bordered shadow-md"
            value={values.phone}
            onChange={(e) => setValues(v => ({ ...v, phone: e.target.value }))}
            placeholder="(123) 456-7890"
          />
        </div>

        <div className="form-control mt-4">
          <label className="label" htmlFor={`${id}-category`}>
            <span className="label-text font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Category
            </span>
          </label>
          <select
            id={`${id}-category`}
            className="select select-bordered shadow-md font-medium"
            value={values.categoryId ?? ''}
            onChange={(e) => setValues(v => ({ ...v, categoryId: e.target.value || null }))}
          >
            <option value="">Uncategorized</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="form-control mt-5">
          <label className="label cursor-pointer justify-start gap-3 bg-base-200/50 rounded-2xl p-4 hover:bg-base-200 transition-colors">
            <input
              type="checkbox"
              className="checkbox checkbox-warning shadow-md"
              checked={Boolean(values.favorite)}
              onChange={(e) => setValues(v => ({ ...v, favorite: e.target.checked }))}
            />
            <span className="label-text font-semibold flex items-center gap-2">
              <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Mark as Favorite
            </span>
          </label>
        </div>

        <div className="modal-action mt-6 gap-3">
          <button className="btn btn-ghost flex-1 shadow-md" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary flex-1 shadow-lg" onClick={handleSubmit}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {initial ? 'Save Changes' : 'Add Contact'}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop bg-base-content/20" onSubmit={(e) => e.preventDefault()}>
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}


