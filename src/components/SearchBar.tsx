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
        <span className="label-text">Search</span>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 opacity-70">
          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.255 2.255a.75.75 0 1 1-1.06 1.06l-2.255-2.255ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
        </svg>
        <input
          id={id}
          type="text"
          className="grow"
          placeholder={placeholder ?? 'Search by name or email'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}


