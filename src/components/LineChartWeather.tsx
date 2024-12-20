import { Paper } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

interface ChartData {
  labels: string[];
  values: number[];
}

export default function LineChartWeather({ data }: { data: ChartData }) {
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <LineChart
        width={600}
        height={300}
        series={[{ data: data.values, label: 'Temperatura (K)' }]}
        xAxis={[{ scaleType: 'point', data: data.labels }]}
      />
    </Paper>
  );
}
