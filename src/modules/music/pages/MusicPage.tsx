import React from 'react';
import { Collapse, Spin } from 'antd';
import { YearFiles } from '../components/YearFiles';

// Mock de la API que nos da los años disponibles
const fetchAvailableYears = (): Promise<number[]> => {
  return new Promise(res => setTimeout(() => res([2025, 2024, 2023]), 500));
};

// (En un proyecto real, esto vendría de useQuery)
const useAvailableYears = () => {
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


export const MusicPage: React.FC = () => {
  const { years, isLoading } = useAvailableYears();

  if (isLoading) {
    return <Spin tip="Cargando años..." size="large" />;
  }

  // Usamos el año más reciente (el primero de la lista) como el panel
  // abierto por defecto
  const defaultActiveKey = years.length > 0 ? years[0].toString() : undefined;

  return (
    <div style={{ padding: '24px' }}>
      <h1>Archivo Histórico</h1>
      <Collapse defaultActiveKey={defaultActiveKey} accordion>
        {years.map(year => (
          <Collapse.Panel header={`Archivos del ${year}`} key={year.toString()}>
            {/*
              BUENA PRÁCTICA DE RENDIMIENTO:
              El componente <YearFiles year={year} /> NO se monta
              ni hace sus llamadas a la API hasta que el usuario
              HACE CLIC en el panel de ese año.
              Esto es "lazy loading" de datos, ¡gratis gracias
              al componente Collapse!
            */}
            <YearFiles year={year} />
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};