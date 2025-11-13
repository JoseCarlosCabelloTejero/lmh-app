import React from 'react';
import { List, Spin, Empty } from 'antd';
import { FileItem, type ApiFile } from './FileItem'; // Reutilizamos los tipos

// Props del componente
interface FileListProps {
  files: ApiFile[];
  onDelete: (id: string) => void;
  isLoading: boolean; // Un solo booleano para toda la lista
  // Opcional: para saber qué item específico está cargando
  deletingId?: string | null; 
}

export const FileList: React.FC<FileListProps> = ({ files, onDelete, isLoading, deletingId }) => {
  // 1. Estado de carga inicial
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <Spin tip="Cargando archivos..." />
      </div>
    );
  }

  // 2. Estado vacío (cuando no está cargando y no hay archivos)
  if (files.length === 0) {
    return (
      <Empty 
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="No hay archivos" 
      />
    );
  }

  // 3. Estado con datos
  return (
    <List
      itemLayout="horizontal"
      dataSource={files}
      renderItem={(file) => (
        <FileItem
          key={file.id}
          file={file}
          onDelete={onDelete}
          // Pasamos el estado de carga individual al FileItem
          isLoading={deletingId === file.id}
        />
      )}
    />
  );
};