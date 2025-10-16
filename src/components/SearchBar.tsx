import { useId } from 'react';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const id = useId();
  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="label">
        <span className="label-text font-semibold text-sm">Search</span>
      </label>
      <label className="input input-bordered bg-base-100/80 backdrop-blur flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary/40 shadow-md hover:shadow-lg transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-5 opacity-70 text-primary">
          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.255 2.255a.75.75 0 1 1-1.06 1.06l-2.255-2.255ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
        </svg>
        <input
          id={id}
          type="text"
          className="grow font-medium"
          placeholder={placeholder ?? 'Search by name or email...'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search contacts"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="btn btn-ghost btn-xs btn-circle"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </label>
    </div>
  );
}


