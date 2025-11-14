import React, { useState } from 'react';
import { Upload, Button, message, type UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';

// Props del componente
interface FileUploaderProps {
  // La función que realmente sube el archivo a la API
  // Debe ser una promesa para que podamos manejar los estados de carga
  onUpload: (file: File) => Promise<any>; 
  disabled?: boolean;
}

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg'];
const MAX_SIZE_MB = 10; // Límite de 10MB

export const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);

  // 1. Validación ANTES de subir (Buena Práctica)
  const beforeUpload = (file: RcFile) => {
    const isAllowedType = ALLOWED_TYPES.includes(file.type);
    if (!isAllowedType) {
      message.error(`${file.name} no es un archivo PDF o JPG válido.`);
      return Upload.LIST_IGNORE; // Evita que AntD lo añada a la lista
    }

    const isLtMaxSize = file.size / 1024 / 1024 < MAX_SIZE_MB;
    if (!isLtMaxSize) {
      message.error(`El archivo debe ser más pequeño de ${MAX_SIZE_MB}MB.`);
      return Upload.LIST_IGNORE;
    }

    // Si todo está bien, permitimos que customRequest se ejecute
    return true; 
  };

  // 2. Aquí está la clave: customRequest (Buena Práctica)
  // Esto nos da control total sobre la llamada a la API REST
  const handleCustomRequest: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    
    // El 'file' aquí es un objeto File estándar
    const castedFile = file as File;

    setIsLoading(true);
    try {
      // Llamamos a la función "inteligente" que nos pasaron por props
      await onUpload(castedFile); 
      
      message.success(`${castedFile.name} subido con éxito.`);
      if (onSuccess) onSuccess(null); // Notifica a AntD que fue exitoso

    } catch (error) {
      console.error('Error al subir:', error);
      message.error(`Error al subir ${castedFile.name}.`);
      if (onError) onError(error as Error); // Notifica a AntD que falló
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Upload
      customRequest={handleCustomRequest}
      beforeUpload={beforeUpload}
      accept=".pdf,.jpg,.jpeg" // Filtro inicial del navegador
      showUploadList={false} // No necesitamos la lista de AntD, tenemos la nuestra
      disabled={disabled || isLoading}
    >
      <Button
        icon={<UploadOutlined />}
        loading={isLoading}
        disabled={disabled}
      >
        Subir archivo
      </Button>
    </Upload>
  );
};