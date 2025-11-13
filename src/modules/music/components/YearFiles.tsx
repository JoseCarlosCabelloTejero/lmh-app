import React from 'react';
import { Row, Col, message } from 'antd';
import { FileSection } from '../components/FileSection';
import { FileUploader } from '../components/FileUploader';
import { FileList } from '../components/FileList';
import { type ApiFile } from '../components/FileItem';

// --- MOCK DE LA LÓGICA DE DATOS (React Query) ---
// En un proyecto real, esto usaría React Query (TanStack Query)
// ¡Esta es la mejor práctica absoluta para data fetching!

// 1. Mock de las llamadas a la API REST
const fetchMusicApi = async (year: number): Promise<ApiFile[]> => {
  console.log(`[API] Obteniendo música para ${year}...`);
  return new Promise(res => setTimeout(() => res([
    { id: 'm1', name: `partitura-${year}-1.pdf`, type: 'pdf' },
  ]), 1000));
};
const fetchLyricsApi = async (year: number): Promise<ApiFile[]> => {
  console.log(`[API] Obteniendo letras para ${year}...`);
  return new Promise(res => setTimeout(() => res([
    { id: 'l1', name: `letra-concierto-${year}.jpg`, type: 'jpg' },
  ]), 1000));
};
const uploadMusicApi = async (year: number, file: File): Promise<ApiFile> => {
  console.log(`[API] Subiendo música ${file.name} para ${year}...`);
  return new Promise(res => setTimeout(() => res(
    { id: `m-${Math.random()}`, name: file.name, type: file.type.includes('pdf') ? 'pdf' : 'jpg' }
  ), 1500));
};
// const uploadLyricsApi = ... (similar)
const deleteMusicApi = async (year: number, id: string): Promise<void> => {
  console.log(`[API] Borrando música ${id} para ${year}...`);
  return new Promise(res => setTimeout(res, 500));
};
// const deleteLyricsApi = ... (similar)


// 2. Mock de los "hooks" de React Query
// (Esto es solo para simular; en la vida real usarías `useQuery` y `useMutation`)
const useYearFilesData = (year: number) => {
  // Simulación de React Query
  // En la vida real, 'data', 'isLoading' y 'mutate' vendrían de useQuery/useMutation
  
  // Datos de Música
  const [musicData, setMusicData] = React.useState<ApiFile[]>([]);
  const [isMusicLoading, setIsMusicLoading] = React.useState(true);
  const [deletingMusicId, setDeletingMusicId] = React.useState<string | null>(null);

  // Datos de Letras
  const [lyricsData, setLyricsData] = React.useState<ApiFile[]>([]);
  const [isLyricsLoading, setIsLyricsLoading] = React.useState(true);
  
  // Carga inicial (como lo haría useQuery)
  React.useEffect(() => {
    setIsMusicLoading(true);
    setIsLyricsLoading(true);
    fetchMusicApi(year).then(data => {
      setMusicData(data);
      setIsMusicLoading(false);
    });
    fetchLyricsApi(year).then(data => {
      setLyricsData(data);
      setIsLyricsLoading(false);
    });
  }, [year]);

  // Mutación de Subida (como lo haría useMutation)
  const handleMusicUpload = async (file: File) => {
    const newFile = await uploadMusicApi(year, file);
    // React Query haría esto automático con "invalidateQueries"
    setMusicData(current => [...current, newFile]);
  };

  // Mutación de Borrado (como lo haría useMutation)
  const handleMusicDelete = async (id: string) => {
    setDeletingMusicId(id);
    try {
      await deleteMusicApi(year, id);
      // React Query haría esto automático
      setMusicData(current => current.filter(f => f.id !== id));
      message.success('Archivo borrado');
    } catch (e) {
      message.error('Error al borrar');
    } finally {
      setDeletingMusicId(null);
    }
  };

  // ... (harías lo mismo para lyricsUpload y lyricsDelete) ...
  
  return {
    music: { data: musicData, isLoading: isMusicLoading, deletingId: deletingMusicId },
    lyrics: { data: lyricsData, isLoading: isLyricsLoading },
    handleMusicUpload,
    handleMusicDelete,
    // ... handlers de lyrics
  };
};

// --- FIN DEL MOCK ---


// Props del componente
interface YearFilesProps {
  year: number;
}

export const YearFiles: React.FC<YearFilesProps> = ({ year }) => {
  // Usamos nuestro "hook" (simulado) para obtener datos y lógica
  const {
    music,
    lyrics,
    handleMusicUpload,
    handleMusicDelete,
  } = useYearFilesData(year);

  // 3. El renderizado: aquí componemos todo
  // Este componente "conoce" la lógica de negocio (música, letras)
  // y la inyecta en los componentes "tontos" (FileSection, FileUploader, FileList)
  return (
    <Row gutter={24}>
      <Col span={12}>
        {/* Sección de Música */}
        <FileSection title="Música">
          <FileUploader onUpload={handleMusicUpload} />
          <FileList
            files={music.data}
            isLoading={music.isLoading}
            onDelete={handleMusicDelete}
            deletingId={music.deletingId}
          />
        </FileSection>
      </Col>

      <Col span={12}>
        {/* Sección de Letras */}
        <FileSection title="Letras">
          <FileUploader onUpload={() => Promise.reject('No implementado')} />
          <FileList
            files={lyrics.data}
            isLoading={lyrics.isLoading}
            onDelete={() => alert('No implementado')}
          />
        </FileSection>
      </Col>
    </Row>
  );
};