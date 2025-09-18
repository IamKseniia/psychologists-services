export function getComparator(sortKey) {
  const collator = new Intl.Collator(undefined, { sensitivity: 'base' });

  const byNameAsc = (a, b) => collator.compare(a.name ?? '', b.name ?? '');
  const byNameDesc = (a, b) => collator.compare(b.name ?? '', a.name ?? '');

  const byPrice = dir => (a, b) => {
    const pa = a.price_per_hour ?? 0;
    const pb = b.price_per_hour ?? 0;
    return dir === 'asc' ? pa - pb : pb - pa;
  };

  const byRating = dir => (a, b) => {
    const ra = a.rating ?? 0;
    const rb = b.rating ?? 0;
    return dir === 'asc' ? ra - rb : rb - ra;
  };

  switch (sortKey) {
    case 'name-asc':
      return byNameAsc;
    case 'name-desc':
      return byNameDesc;
    case 'price-asc':
      return byPrice('asc');
    case 'price-desc':
      return byPrice('desc');
    case 'rating-asc':
      return byRating('asc');
    case 'rating-desc':
      return byRating('desc');
    default:
      return byNameAsc;
  }
}

export function sortPsychologists(list, sortKey) {
  const arr = [...list];
  arr.sort(getComparator(sortKey));
  return arr;
}
