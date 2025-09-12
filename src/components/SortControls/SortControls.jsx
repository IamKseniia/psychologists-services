import s from './SortControls.module.css';

export default function SortControls({ value, onChange }) {
  return (
    <div className={s.sortBar}>
      <label className={s.label}>
        Filters
        <select
          className={s.select}
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          <option value="name-asc">A to Z</option>
          <option value="name-desc">Z to A</option>
          <option value="price-asc">Price ascending</option>
          <option value="price-desc">Price descending</option>
          <option value="rating-asc">Not popular</option>
          <option value="rating-desc">Popular</option>
        </select>
      </label>
    </div>
  );
}
