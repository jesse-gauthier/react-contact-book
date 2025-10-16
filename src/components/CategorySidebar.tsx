import { useMemo, useState } from 'react';
import { useContactsContext } from '../context/ContactsProvider';
import type { CategoryColor } from '../types';

const colorOptions: CategoryColor[] = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'];

export default function CategorySidebar() {
  const { categories, contacts, activeCategoryId, setActiveCategoryId, addCategory, deleteCategory } = useContactsContext() as any;
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState<CategoryColor>('primary');
  const [openManage, setOpenManage] = useState(false);

  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    (contacts ?? []).forEach((c: any) => {
      const key = c.categoryId ?? 'uncategorized';
      counts[key] = (counts[key] ?? 0) + 1;
    });
    return counts;
  }, [contacts]);

  function handleAddCategory() {
    if (!newName.trim()) return;
    addCategory(newName, newColor);
    setNewName('');
  }

  return (
    <aside className="w-full sm:w-64 p-4 overflow-y-auto max-h-[calc(100dvh-4rem)]" aria-label="Category filters">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Categories</h2>
        <button className="btn btn-sm" onClick={() => setOpenManage(true)} aria-label="Manage categories">Manage</button>
      </div>
      <ul className="menu rounded-box bg-base-100 shadow-sm">
        <li>
            <button className={!activeCategoryId ? 'active' : ''} onClick={() => setActiveCategoryId(null)}>
            <span className="badge badge-outline mr-2">All</span>
            All
            {contacts?.length ? <span className="ml-auto badge badge-ghost">{contacts.length}</span> : null}
          </button>
        </li>
        {categories.map(cat => (
          <li key={cat.id}>
            <button className={activeCategoryId === cat.id ? 'active' : ''} onClick={() => setActiveCategoryId(cat.id)}>
              <span className={`badge badge-${cat.color} mr-2`} />
              {cat.name}
              {countsByCategory[cat.id] ? <span className="ml-auto badge badge-ghost">{countsByCategory[cat.id]}</span> : null}
            </button>
          </li>
        ))}
      </ul>

      <dialog className="modal" open={openManage}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Manage Categories</h3>
          <div className="form-control mt-4">
            <label className="label"><span className="label-text">Name</span></label>
            <input className="input input-bordered" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New category" />
          </div>
          <div className="form-control mt-2">
            <label className="label"><span className="label-text">Color</span></label>
            <select className="select select-bordered" value={newColor} onChange={(e) => setNewColor(e.target.value as CategoryColor)}>
              {colorOptions.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="btn btn-primary" onClick={handleAddCategory}>Add</button>
            <button className="btn" onClick={() => setOpenManage(false)}>Close</button>
          </div>
          <div className="divider">Existing</div>
          <ul className="space-y-2">
            {categories.map(c => (
              <li key={c.id} className="flex items-center gap-2">
                <span className={`badge badge-${c.color}`} />
                <span className="flex-1">{c.name}</span>
                <button className="btn btn-xs btn-outline btn-error" onClick={() => deleteCategory(c.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop" onSubmit={(e) => e.preventDefault()}>
          <button onClick={() => setOpenManage(false)}>close</button>
        </form>
      </dialog>
    </aside>
  );
}


