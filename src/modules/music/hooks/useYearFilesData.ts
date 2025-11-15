import React from 'react';
import { message } from 'antd';
import { type ApiFile } from '../../common/FileItem';
import { 
  fetchMusicApi, 
  fetchLyricsApi, 
  uploadMusicApi,
  uploadLyricsApi, 
  deleteMusicApi,
  deleteLyricsApi
} from '../services/musicApi';

// 2. Mock de los "hooks" de React Query
// (Esto es solo para simular; en la vida real usarías `useQuery` y `useMutation`)
export const useYearFilesData = (year: number) => {
  // Simulación de React Query
  // En la vida real, 'data', 'isLoading' y 'mutate' vendrían de useQuery/useMutation
  
  // Datos de Música
  const [musicData, setMusicData] = React.useState<ApiFile[]>([]);
  const [isMusicLoading, setIsMusicLoading] = React.useState(true);
  const [deletingMusicId, setDeletingMusicId] = React.useState<string | null>(null);

  // Datos de Letras
  const [lyricsData, setLyricsData] = React.useState<ApiFile[]>([]);
  const [isLyricsLoading, setIsLyricsLoading] = React.useState(true);
  const [deletingLyricsId, setDeletingLyricsId] = React.useState<string | null>(null);
  
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

  // Mutación de Subida (como lo haría useMutation)
  const handleLyricsUpload = async (file: File) => {
    const newFile = await uploadLyricsApi(year, file);
    // React Query haría esto automático con "invalidateQueries"
    setLyricsData(current => [...current, newFile]);
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

  // Mutación de Borrado (como lo haría useMutation)
  const handleLyricscDelete = async (id: string) => {
    setDeletingLyricsId(id);
    try {
      await deleteLyricsApi(year, id);
      // React Query haría esto automático
      setLyricsData(current => current.filter(f => f.id !== id));
      message.success('Archivo borrado');
    } catch (e) {
      message.error('Error al borrar');
    } finally {
      setDeletingLyricsId(null);
    }
  };

  
  return {
    music: { data: musicData, isLoading: isMusicLoading, deletingId: deletingMusicId },
    lyrics: { data: lyricsData, isLoading: isLyricsLoading, deletingId: deletingLyricsId },
    handleMusicUpload,
    handleLyricsUpload,
    handleMusicDelete,
    handleLyricscDelete,
  };
};