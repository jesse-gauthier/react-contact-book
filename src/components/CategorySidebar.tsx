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
    <aside className="w-full sm:w-64 p-6 overflow-y-auto max-h-[calc(100dvh-4rem)]" aria-label="Category filters">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Categories</h2>
        <button className="btn btn-sm btn-primary shadow-md" onClick={() => setOpenManage(true)} aria-label="Manage categories">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>
      <ul className="menu rounded-2xl bg-base-100/60 backdrop-blur-lg shadow-lg border border-base-300/50 p-2 space-y-1">
        <li>
          <button className={`${!activeCategoryId ? 'active bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold shadow-lg' : 'hover:bg-base-200/70'} transition-all`} onClick={() => setActiveCategoryId(null)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            All Contacts
            {contacts?.length ? <span className={`ml-auto badge ${!activeCategoryId ? 'badge-primary-content' : 'badge-ghost'} shadow-sm`}>{contacts.length}</span> : null}
          </button>
        </li>
        {categories.map(cat => (
          <li key={cat.id}>
            <button className={`${activeCategoryId === cat.id ? `active bg-gradient-to-r from-${cat.color} to-${cat.color} text-${cat.color}-content font-semibold shadow-lg` : 'hover:bg-base-200/70'} transition-all`} onClick={() => setActiveCategoryId(cat.id)}>
              <span className={`w-3 h-3 rounded-full bg-${cat.color} shadow-md`} />
              {cat.name}
              {countsByCategory[cat.id] ? <span className={`ml-auto badge ${activeCategoryId === cat.id ? `badge-${cat.color}-content` : 'badge-ghost'} shadow-sm`}>{countsByCategory[cat.id]}</span> : null}
            </button>
          </li>
        ))}
      </ul>

      <dialog className="modal backdrop-blur-sm" open={openManage}>
        <div className="modal-box shadow-2xl border border-base-300/50 rounded-3xl max-w-md">
          <h3 className="font-bold text-2xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Manage Categories</h3>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-semibold">Category Name</span>
            </label>
            <input
              className="input input-bordered shadow-md"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter category name..."
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-semibold">Color Theme</span>
            </label>
            <select
              className="select select-bordered shadow-md font-medium"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value as CategoryColor)}
            >
              {colorOptions.map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="btn btn-primary flex-1 shadow-lg" onClick={handleAddCategory}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Category
            </button>
            <button className="btn btn-ghost shadow-md" onClick={() => setOpenManage(false)}>Cancel</button>
          </div>
          <div className="divider text-base-content/60">Existing Categories</div>
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {categories.map(c => (
              <li key={c.id} className="flex items-center gap-3 p-3 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors">
                <span className={`w-4 h-4 rounded-full bg-${c.color} shadow-md`} />
                <span className="flex-1 font-medium">{c.name}</span>
                <button
                  className="btn btn-xs btn-error btn-outline shadow-sm"
                  onClick={() => deleteCategory(c.id)}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop bg-base-content/20" onSubmit={(e) => e.preventDefault()}>
          <button onClick={() => setOpenManage(false)}>close</button>
        </form>
      </dialog>
    </aside>
  );
}


