import React from 'react';
import { List, Button, Typography, Popconfirm, message } from 'antd';
import {
  FilePdfOutlined,
  FileJpgOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

// Definimos los tipos de archivo que aceptamos
export type FileType = 'pdf' | 'jpg';

// Definimos el objeto "file"
export interface ApiFile {
  id: string;
  name: string;
  type: FileType;
  // url: string; // Posiblemente tengas una URL para descargar
}

// Props del componente
interface FileItemProps {
  file: ApiFile;
  onDelete: (id: string) => void;
  // Opcional: para mostrar feedback si ESE item se está borrando
  isLoading?: boolean; 
}

// El componente en sí
export const FileItem: React.FC<FileItemProps> = ({ file, onDelete, isLoading }) => {
  
  // Pequeño helper para elegir el icono correcto
  const fileIcon =
    file.type === 'pdf' ? <FilePdfOutlined /> : <FileJpgOutlined />;

  // Handler para el clic en borrar, que llama a la prop
  const handleDelete = () => {
    onDelete(file.id);
  };

  return (
    <List.Item
      actions={[
        <Popconfirm
          title="¿Seguro que quieres borrar este archivo?"
          onConfirm={handleDelete}
          okText="Sí, borrar"
          cancelText="Cancelar"
        >
          <Button
            type="link"
            danger
            icon={isLoading ? <LoadingOutlined /> : <DeleteOutlined />}
            disabled={isLoading}
          />
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta
        avatar={fileIcon}
        title={<Typography.Text>{file.name}</Typography.Text>}
      />
    </List.Item>
  );
};