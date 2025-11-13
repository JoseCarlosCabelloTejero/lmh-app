import React from 'react';
import { Card } from 'antd';

// Props del componente
interface FileSectionProps {
  title: string;
  children: React.ReactNode; // ¡La clave de la composición!
}

export const FileSection: React.FC<FileSectionProps> = ({ title, children }) => {
  return (
    <Card title={title} style={{ marginBottom: 24 }}>
      {children}
    </Card>
  );
};