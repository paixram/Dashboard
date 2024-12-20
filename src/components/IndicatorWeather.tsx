import { Card, CardContent, Typography } from '@mui/material';

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
}

export default function IndicatorWeather({ title, subtitle, value }: Indicator) {
  return (
    <Card sx={{ minWidth: 200, textAlign: 'center' }}>
      <CardContent>
        <Typography color="primary" variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" fontWeight="bold">
          {value}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

