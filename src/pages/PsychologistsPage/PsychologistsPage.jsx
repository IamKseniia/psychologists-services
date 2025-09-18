import { useEffect, useMemo, useState } from 'react';
import { getPsychologists } from '../../services/psychologistsService';
import PsychologistCard from '../../components/PsychologistCard/PsychologistCard';
import SortControls from '../../components/SortControls/SortControls';
import s from './PsychologistsPage.module.css';
import clsx from 'clsx';
import { useSorter } from '../../context/SorterContext';

function getComparator(sortKey) {
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

export default function PsychologistsPage() {
  const [raw, setRaw] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const { sortKey } = useSorter();

  useEffect(() => {
    getPsychologists().then(setRaw);
  }, []);

  const sorted = useMemo(() => {
    const arr = [...raw];
    arr.sort(getComparator(sortKey));
    return arr;
  }, [raw, sortKey]);

  const visible = sorted.slice(0, visibleCount);
  const loadMore = () => setVisibleCount(c => c + 3);

  return (
    <div className={clsx('container', s.page)}>
      <SortControls />
      <div className={s.list}>
        {visible.map(p => (
          <PsychologistCard key={`${p.license}-${p.name}`} psychologist={p} />
        ))}
      </div>
      {visibleCount < sorted.length && (
        <div className={s.loadMoreBtnContainer}>
          <button
            className={clsx('button', s.loadMoreButton)}
            onClick={loadMore}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
