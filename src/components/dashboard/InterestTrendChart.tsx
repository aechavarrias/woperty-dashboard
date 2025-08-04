import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface DataPoint {
  week: string;
  visits: number;
  price: number;
}

interface InterestTrendChartProps {
  data: DataPoint[];
}

const InterestTrendChart: React.FC<InterestTrendChartProps> = ({ data }) => {
  const hasEnoughData = data.filter(d => d.visits > 0 || d.price > 0).length > 1;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Tendencia de Interés y Precio</h2>

      {hasEnoughData ? (
        <>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 50, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis
                  yAxisId="left"
                  label={{ value: 'Contactos', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: 'Precio (CLP)', angle: -90, position: 'insideRight' }}
                  tickFormatter={(v) => `${v.toLocaleString()}`}
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="visits"
                  name="Contactos"
                  stroke="#3182CE"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="price"
                  name="Precio (CLP)"
                  stroke="#38A169"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Últimas {data.length} semanas: <span className="font-medium text-gray-800">{data.reduce((sum, p) => sum + p.visits, 0)} contactos totales</span>
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-600">
          <p>Aún no hay suficiente información para mostrar la gráfica.</p>
          <p>Verás la evolución del interés y precio de tu propiedad una vez que se acumulen más visitas o cambios de precio.</p>
        </div>
      )}
    </div>
  );
};

export default InterestTrendChart;
