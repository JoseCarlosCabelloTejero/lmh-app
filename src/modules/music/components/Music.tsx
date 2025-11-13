import { Button } from 'antd';

type Props = {
    title: string;
}

const Music = ({title}: Props) => (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <p>
        Aquí iría el contenido del módulo <strong>{title}</strong>. 
      </p>
      <Button>Default</Button>
    </div>
);

export default Music;