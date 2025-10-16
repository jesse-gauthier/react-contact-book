import { useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type {
  Category,
  CategoryColor,
  Contact,
  ContactFormValues,
  ContactsState,
  ToastMessage,
} from "../types";

const CONTACTS_KEY = "contactBook.contacts.v1";
const CATEGORIES_KEY = "contactBook.categories.v1";

function generateId(prefix: string): string {
  return `${prefix}_${Math.random()
    .toString(36)
    .slice(2, 10)}_${Date.now().toString(36)}`;
}

const seedColors: CategoryColor[] = [
  "primary",
  "secondary",
  "accent",
  "info",
  "success",
  "warning",
  "error",
];

const UNCATEGORIZED_NAME = "Uncategorized";

function createDefaultCategories(): Category[] {
  return [{ id: generateId("cat"), name: UNCATEGORIZED_NAME, color: "info" }];
}

function sortContactsAlpha(contacts: Contact[]): Contact[] {
  return [...contacts].sort((a, b) => a.name.localeCompare(b.name));
}

export function useContacts() {
  const [contacts, setContacts] = useLocalStorage<Contact[]>(CONTACTS_KEY, []);
  const [categories, setCategories] = useLocalStorage<Category[]>(
    CATEGORIES_KEY,
    createDefaultCategories()
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Ensure there is always an Uncategorized category
  const uncategorizedId = useMemo(() => {
    const existing = categories.find(
      (c) => c.name.toLowerCase() === UNCATEGORIZED_NAME.toLowerCase()
    );
    return existing ? existing.id : null;
  }, [categories]);

  const categoriesEnsured = useMemo(() => {
    if (uncategorizedId) return categories;
    const newCat: Category = {
      id: generateId("cat"),
      name: UNCATEGORIZED_NAME,
      color: "info",
    };
    const next = [newCat, ...categories];
    setCategories(next);
    return next;
  }, [categories, uncategorizedId, setCategories]);

  const showToast = (type: ToastMessage["type"], message: string) => {
    const id = generateId("toast");
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      2500
    );
  };

  function addContact(values: ContactFormValues): void {
    const contact: Contact = {
      id: generateId("ct"),
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      categoryId: values.categoryId ?? uncategorizedId,
      favorite: Boolean(values.favorite),
      createdAt: new Date().toISOString(),
    };
    setContacts((prev) => sortContactsAlpha([...(prev ?? []), contact]));
    showToast("success", "Contact added");
  }

  function updateContact(id: string, values: ContactFormValues): void {
    setContacts((prev) =>
      sortContactsAlpha(
        (prev ?? []).map((c) =>
          c.id === id
            ? {
                ...c,
                name: values.name.trim(),
                email: values.email.trim(),
                phone: values.phone.trim(),
                categoryId: values.categoryId ?? uncategorizedId,
                favorite: Boolean(values.favorite ?? c.favorite),
              }
            : c
        )
      )
    );
    showToast("success", "Contact updated");
  }

  function deleteContact(id: string): void {
    setContacts((prev) => (prev ?? []).filter((c) => c.id !== id));
    showToast("success", "Contact deleted");
  }

  function toggleFavorite(id: string): void {
    setContacts((prev) =>
      sortContactsAlpha(
        (prev ?? []).map((c) =>
          c.id === id ? { ...c, favorite: !c.favorite } : c
        )
      )
    );
  }

  function addCategory(name: string, color?: CategoryColor): string {
    const cleaned = name.trim();
    if (!cleaned) return uncategorizedId ?? "";
    const exists = categoriesEnsured.some(
      (c) => c.name.toLowerCase() === cleaned.toLowerCase()
    );
    if (exists) {
      showToast("warning", "Category already exists");
      return (
        categoriesEnsured.find(
          (c) => c.name.toLowerCase() === cleaned.toLowerCase()
        )?.id ??
        uncategorizedId ??
        ""
      );
    }
    const nextColor =
      color ?? seedColors[categoriesEnsured.length % seedColors.length];
    const cat: Category = {
      id: generateId("cat"),
      name: cleaned,
      color: nextColor,
    };
    setCategories((prev) => [cat, ...(prev ?? [])]);
    showToast("success", "Category added");
    return cat.id;
  }

  function renameCategory(id: string, newName: string): void {
    const cleaned = newName.trim();
    if (!cleaned) return;
    setCategories((prev) =>
      (prev ?? []).map((c) => (c.id === id ? { ...c, name: cleaned } : c))
    );
    showToast("success", "Category renamed");
  }

  function deleteCategory(id: string, reassignToId?: string): void {
    const targetId = id;
    const fallbackId = reassignToId ?? uncategorizedId ?? null;
    // remove category
    setCategories((prev) => (prev ?? []).filter((c) => c.id !== targetId));
    // reassign contacts
    setContacts((prev) =>
      (prev ?? []).map((c) =>
        c.categoryId === targetId ? { ...c, categoryId: fallbackId } : c
      )
    );
    showToast("success", "Category deleted");
  }

  const filteredAndSortedContacts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const byQuery = (c: Contact) =>
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q);
    const byCategory = (c: Contact) =>
      !activeCategoryId || c.categoryId === activeCategoryId;
    const list = (contacts ?? []).filter((c) => byQuery(c) && byCategory(c));
    // favorites first, then alpha by name
    return [...list].sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [contacts, searchQuery, activeCategoryId]);

  return {
    contacts: contacts ?? [],
    categories: categoriesEnsured,
    searchQuery,
    activeCategoryId,
    toasts,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    setSearchQuery,
    setActiveCategoryId,
    addCategory,
    renameCategory,
    deleteCategory,
    filteredAndSortedContacts,
  } satisfies Omit<ContactsState, "loading"> & {
    addContact: (values: ContactFormValues) => void;
    updateContact: (id: string, values: ContactFormValues) => void;
    deleteContact: (id: string) => void;
    toggleFavorite: (id: string) => void;
    setSearchQuery: (q: string) => void;
    setActiveCategoryId: (id: string | null) => void;
    addCategory: (name: string, color?: CategoryColor) => string;
    renameCategory: (id: string, newName: string) => void;
    deleteCategory: (id: string, reassignToId?: string) => void;
    filteredAndSortedContacts: Contact[];
  };
}
