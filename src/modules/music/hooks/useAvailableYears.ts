import React from 'react';
import { fetchAvailableYears } from '../services/musicApi';

// (En la vida real, aquí usarías useQuery de React Query)
export const useAvailableYears = () => {
  const [years, setYears] = React.useState<number[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchAvailableYears().then(data => {
      setYears(data);
      setIsLoading(false);
    });
  }, []);

  return { years, isLoading };
};