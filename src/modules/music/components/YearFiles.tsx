import React from 'react';
import { Row, Col, message } from 'antd';
import { FileSection } from '../../common/FileSection/FileSection';
import { FileUploader } from '../../common/FileUploader/FileUploader';
import { FileList } from '../../common/FileList/FileList';
import { useYearFilesData } from '../hooks/useYearFilesData'

// Props del componente
interface YearFilesProps {
  year: number;
}

export const YearFiles: React.FC<YearFilesProps> = ({ year }) => {
  // Usamos nuestro "hook" (simulado) para obtener datos y lógica
  // Este componente NO SABE CÓMO se obtienen los datos- Importante concepto a aprender
  const {
    music,
    lyrics,
    handleMusicUpload,
    handleLyricsUpload,
    handleMusicDelete,
    handleLyricscDelete
  } = useYearFilesData(year);

  // 3. El renderizado: aquí componemos todo
  // Se aplica Composition Pattern 
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
          <FileUploader onUpload={handleLyricsUpload} />
          <FileList
            files={lyrics.data}
            isLoading={lyrics.isLoading}
            onDelete={handleLyricscDelete}
          />
        </FileSection>
      </Col>
    </Row>
  );
};