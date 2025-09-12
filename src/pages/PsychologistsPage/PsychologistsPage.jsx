import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPsychologists } from '../../services/psychologistsService';
import PsychologistCard from '../../components/PsychologistCard/PsychologistCard';
import SortControls from '../../components/SortControls/SortControls';
import s from './PsychologistsPage.module.css';
import clsx from 'clsx';

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

  // зберігаємо вибір сортування в URL (?sort=...)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = searchParams.get('sort') || 'name-asc';
  const [sortKey, setSortKey] = useState(initialSort);

  useEffect(() => {
    getPsychologists().then(setRaw);
  }, []);

  // оновлюємо параметр URL при зміні сорту
  useEffect(() => {
    const sp = new URLSearchParams(searchParams);
    sp.set('sort', sortKey);
    setSearchParams(sp, { replace: true });
  }, [sortKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Сортуємо ВЕСЬ масив і лише потім робимо slice — щоб "Load more" підтягував у правильному порядку
  const sorted = useMemo(() => {
    const arr = [...raw];
    arr.sort(getComparator(sortKey));
    return arr;
  }, [raw, sortKey]);

  const visible = sorted.slice(0, visibleCount);

  const loadMore = () => setVisibleCount(c => c + 3);

  return (
    <div className="container">
      <div className={s.page}>
        <SortControls value={sortKey} onChange={setSortKey} />

        {sorted.length === 0 ? (
          <p>No data</p>
        ) : (
          <div className={s.list}>
            {visible.map((item, index) => (
              <PsychologistCard key={index} psychologist={item} />
            ))}
          </div>
        )}

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
    </div>
  );
}
