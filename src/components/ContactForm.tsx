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
    <dialog className="modal" open={open}>
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg">{initial ? 'Edit Contact' : 'Add Contact'}</h3>

        <div className="form-control mt-3">
          <label className="label" htmlFor={`${id}-name`}><span className="label-text">Name</span></label>
          <input id={`${id}-name`} className={`input input-bordered ${errors.name ? 'input-error' : ''}`} value={values.name} onChange={(e) => setValues(v => ({ ...v, name: e.target.value }))} />
          {errors.name ? <span className="text-error text-sm mt-1">{errors.name}</span> : null}
        </div>

        <div className="form-control mt-3">
          <label className="label" htmlFor={`${id}-email`}><span className="label-text">Email</span></label>
          <input id={`${id}-email`} type="email" className={`input input-bordered ${errors.email ? 'input-error' : ''}`} value={values.email} onChange={(e) => setValues(v => ({ ...v, email: e.target.value }))} />
          {errors.email ? <span className="text-error text-sm mt-1">{errors.email}</span> : null}
        </div>

        <div className="form-control mt-3">
          <label className="label" htmlFor={`${id}-phone`}><span className="label-text">Phone</span></label>
          <input id={`${id}-phone`} className="input input-bordered" value={values.phone} onChange={(e) => setValues(v => ({ ...v, phone: e.target.value }))} />
        </div>

        <div className="form-control mt-3">
          <label className="label" htmlFor={`${id}-category`}><span className="label-text">Category</span></label>
          <select id={`${id}-category`} className="select select-bordered" value={values.categoryId ?? ''} onChange={(e) => setValues(v => ({ ...v, categoryId: e.target.value || null }))}>
            <option value="">Uncategorized</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="form-control mt-3">
          <label className="label cursor-pointer justify-start gap-3">
            <input type="checkbox" className="checkbox" checked={Boolean(values.favorite)} onChange={(e) => setValues(v => ({ ...v, favorite: e.target.checked }))} />
            <span className="label-text">Favorite</span>
          </label>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>{initial ? 'Save' : 'Add'}</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onSubmit={(e) => e.preventDefault()}>
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}


