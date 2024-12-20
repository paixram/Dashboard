import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import IndicatorWeather from './components/IndicatorWeather';
import ControlWeather from './components/ControlWeather';
import TableWeather from './components/TableWeather';
import LineChartWeather from './components/LineChartWeather';

interface Indicator {
  title?: string;
  subtitle?: string;
  value?: string;
}

interface WeatherData {
  time: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
}

function App() {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [tableData, setTableData] = useState<WeatherData[]>([]);
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [selectedVariable, setSelectedVariable] = useState<string>('temperature');

  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = 'a62f7fd7575f87ac998c628d7191392b';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
      );
      const data = await response.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'application/xml');

      if (xml.querySelector('parsererror')) {
        console.error('Error al analizar el XML:', xml.querySelector('parsererror')?.textContent);
        return;
      }

      // Indicadores principales
      const name = xml.querySelector('name')?.textContent || 'N/A';
      const locationInner = xml.querySelector('location[altitude]');
      const altitude = locationInner?.getAttribute('altitude') || 'N/A';
      const latitude = locationInner?.getAttribute('latitude') || 'N/A';
      const longitude = locationInner?.getAttribute('longitude') || 'N/A';

      setIndicators([
        { title: 'Ubicación', subtitle: 'Ciudad', value: name },
        { title: 'Latitud', subtitle: 'Coordenadas', value: latitude },
        { title: 'Longitud', subtitle: 'Coordenadas', value: longitude },
        { title: 'Altitud', subtitle: 'Metros', value: altitude },
      ]);

      // Datos del forecast
      const times = xml.querySelectorAll('forecast > time');
      const labels: string[] = [];
      const chartValues: number[] = [];
      const tableValues: WeatherData[] = [];

      times.forEach((time) => {
        const from = time.getAttribute('from') || 'N/A';
        const temperature = time.querySelector('temperature')?.getAttribute('value') || 'N/A';
        const humidity = time.querySelector('humidity')?.getAttribute('value') || 'N/A';
        const windSpeed = time.querySelector('windSpeed')?.getAttribute('mps') || 'N/A';

        // Guardar datos para la tabla
        tableValues.push({
          time: from,
          temperature,
          humidity,
          windSpeed,
        });

        // Datos para el gráfico (según variable seleccionada)
        const value =
          selectedVariable === 'temperature'
            ? temperature
            : selectedVariable === 'humidity'
            ? humidity
            : windSpeed;

        if (value) {
          labels.push(from);
          chartValues.push(parseFloat(value));
        }
      });

      setTableData(tableValues); // Actualiza la tabla con todos los datos
      setChartData({ labels, values: chartValues }); // Actualiza el gráfico
    };

    fetchData();
  }, [selectedVariable]);

  const handleVariableChange = (variable: string) => {
    setSelectedVariable(variable);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Dashboard del Clima
      </Typography>

      <Grid container spacing={4}>
        {indicators.map((indicator, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <IndicatorWeather
              title={indicator.title}
              subtitle={indicator.subtitle}
              value={indicator.value}
            />
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <ControlWeather onVariableChange={handleVariableChange} />
        </Grid>

        <Grid item xs={12}>
          <LineChartWeather data={chartData} />
        </Grid>

        <Grid item xs={12}>
          <TableWeather data={tableData} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
