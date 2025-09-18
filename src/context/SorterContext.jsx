import { createContext, useContext, useState } from 'react';

const SorterContext = createContext();

export const useSorter = () => useContext(SorterContext);

export const SorterProvider = ({ children }) => {
  const [sortKey, setSortKey] = useState('name-asc');

  return (
    <SorterContext.Provider value={{ sortKey, setSortKey }}>
      {children}
    </SorterContext.Provider>
  );
};
