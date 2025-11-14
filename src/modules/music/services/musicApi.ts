import { type ApiFile } from '../../common/FileItem'; // <-- Importa el tipo genérico

// --- MOCK DE LA LÓGICA DE DATOS (React Query) ---
// En un proyecto real, esto usaría React Query (TanStack Query)
// ¡Esta es la mejor práctica absoluta para data fetching!

// 1. Mock de las llamadas a la API REST
export const fetchMusicApi = async (year: number): Promise<ApiFile[]> => {
  console.log(`[API] Obteniendo música para ${year}...`);
  return new Promise(res => setTimeout(() => res([
    { id: 'm1', name: `partitura-${year}-1.pdf`, type: 'pdf' },
  ]), 1000));
};
export const fetchLyricsApi = async (year: number): Promise<ApiFile[]> => {
  console.log(`[API] Obteniendo letras para ${year}...`);
  return new Promise(res => setTimeout(() => res([
    { id: 'l1', name: `letra-concierto-${year}.jpg`, type: 'jpg' },
  ]), 1000));
};
export const uploadMusicApi = async (year: number, file: File): Promise<ApiFile> => {
  console.log(`[API] Subiendo música ${file.name} para ${year}...`);
  return new Promise(res => setTimeout(() => res(
    { id: `m-${Math.random()}`, name: file.name, type: file.type.includes('pdf') ? 'pdf' : 'jpg' }
  ), 1500));
};
// const uploadLyricsApi = ... (similar)
export const deleteMusicApi = async (year: number, id: string): Promise<void> => {
  console.log(`[API] Borrando música ${id} para ${year}...`);
  return new Promise(res => setTimeout(res, 500));
};
// const deleteLyricsApi = ... (similar)

// Mock de la API que nos da los años disponibles
export const fetchAvailableYears = (): Promise<number[]> => {
  return new Promise(res => setTimeout(() => res([2025, 2024, 2023]), 500));
};