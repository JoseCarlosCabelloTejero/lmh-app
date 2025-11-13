import { Button, Calendar } from 'antd';

type Props = {
    title: string;
}

const CalendarioPagos = ({title}: Props) => (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <Calendar></Calendar>
      <Button>Default</Button>
    </div>
);

export default CalendarioPagos;