export type CategoryColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export interface Category {
  id: string;
  name: string;
  color: CategoryColor;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  categoryId: string | null;
  favorite: boolean;
  createdAt: string; // ISO
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  categoryId: string | null;
  favorite?: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export interface StorageError {
  error?: string;
}

export interface ContactsState {
  contacts: Contact[];
  categories: Category[];
  searchQuery: string;
  activeCategoryId: string | null;
  loading: boolean;
  toasts: ToastMessage[];
}

export type CategoryIdToCount = Record<string, number>;


