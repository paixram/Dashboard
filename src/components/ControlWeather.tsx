import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface ControlWeatherProps {
  onVariableChange: (variable: string) => void;
}

export default function ControlWeather({ onVariableChange }: ControlWeatherProps) {
  const items = [
    { name: 'Temperatura', key: 'temperature', description: 'Temperatura en Kelvin.' },
    { name: 'Humedad', key: 'humidity', description: 'Humedad relativa en porcentaje.' },
    { name: 'Velocidad del Viento', key: 'windSpeed', description: 'Velocidad del viento en m/s.' },
  ];

  const [selected, setSelected] = useState<number>(-1);

  const handleChange = (event: SelectChangeEvent) => {
    const idx = parseInt(event.target.value);
    setSelected(idx);

    if (idx >= 0) {
      onVariableChange(items[idx].key); // Notifica al componente principal
    }
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
      <Typography mb={2} component="h3" variant="h6" color="primary">
        Variables Meteorológicas
      </Typography>
      <Box sx={{ minWidth: 120, marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="variable-select-label">Variables</InputLabel>
          <Select
            labelId="variable-select-label"
            id="variable-select"
            value={selected === -1 ? '' : selected.toString()}
            onChange={handleChange}
          >
            <MenuItem value="-1" disabled>
              Seleccione una variable
            </MenuItem>
            {items.map((item, idx) => (
              <MenuItem key={idx} value={idx}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography mt={2} component="p" color="text.secondary">
        {selected >= 0 ? items[selected].description : 'Seleccione una variable para más información.'}
      </Typography>
    </Paper>
  );
}
