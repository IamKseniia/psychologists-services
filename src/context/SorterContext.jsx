import { createContext, useContext, useState } from 'react';

const SorterContext = createContext();

export const useSorter = () => useContext(SorterContext);

export const SorterProvider = ({ children }) => {
  const [sortKey, setSortKey] = useState('name-asc');

  const resetSort = () => setSortKey('name-asc');

  return (
    <SorterContext.Provider value={{ sortKey, setSortKey, resetSort }}>
      {children}
    </SorterContext.Provider>
  );
};
