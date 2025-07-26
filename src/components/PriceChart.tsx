import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  data: Array<{
    date: string;
    price: number;
    predicted?: boolean;
  }>;
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip 
            formatter={(value: number, name: string, props: any) => [
              `₹${value}`, 
              props.payload.predicted ? 'Predicted Price' : 'Actual Price'
            ]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={(props: any) => (
              <circle 
                {...props} 
                fill={props.payload.predicted ? '#f59e0b' : '#10b981'} 
                r={4}
              />
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;