import { renderHook, act } from '@testing-library/react';
import { useContacts } from '../../hooks/useContacts';

function seed() {
  const { result } = renderHook(() => useContacts());
  act(() => {
    result.current.addCategory('Work');
    result.current.addCategory('Friends');
  });
  const workId = result.current.categories.find(c => c.name === 'Work')!.id;
  const friendsId = result.current.categories.find(c => c.name === 'Friends')!.id;
  act(() => {
    result.current.addContact({ name: 'Alice', email: 'alice@work.com', phone: '', categoryId: workId, favorite: false });
    result.current.addContact({ name: 'Bob', email: 'bob@friends.com', phone: '', categoryId: friendsId, favorite: true });
    result.current.addContact({ name: 'Aaron', email: 'aaron@work.com', phone: '', categoryId: workId, favorite: false });
  });
  return result;
}

describe('useContacts', () => {
  it('filters by search (name/email), category, and sorts favorites then alpha', () => {
    const result = seed();
    // filter by Work
    const workId = result.current.categories.find(c => c.name === 'Work')!.id;
    act(() => result.current.setActiveCategoryId(workId));
    let list = result.current.filteredAndSortedContacts.map(c => c.name);
    expect(list).toEqual(['Aaron', 'Alice']);

    // search by email
    act(() => result.current.setActiveCategoryId(null));
    act(() => result.current.setSearchQuery('bob@'));
    list = result.current.filteredAndSortedContacts.map(c => c.name);
    expect(list).toEqual(['Bob']);

    // favorites first then alpha
    act(() => result.current.setSearchQuery(''));
    list = result.current.filteredAndSortedContacts.map(c => c.name);
    expect(list).toEqual(['Bob', 'Aaron', 'Alice']);
  });
});


