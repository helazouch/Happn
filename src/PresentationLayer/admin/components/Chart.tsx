import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./Chart.css"

interface ChartProps {
  axis1: string; // Axe X (Horizontal)
  axis2: string; // Axe Y (Vertical)
}

const data = [
  { category: "Event 1", value: 400 },
  { category: "Event 2", value: 300 },
  { category: "Event 3", value: 500 },
  { category: "Event 4", value: 200 },
  { category: "Event 5", value: 350 }
];

const Chart: React.FC<ChartProps> = ({ axis1, axis2 }) => {
  return (
    <div style={{
        width: "90%", 
        height: 400,     
        marginTop: 80 ,
        marginLeft:50 ,
        marginRight: 50,
        paddingBottom: 30,
    }}>
    
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" label={{ value: axis1, position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: axis2, angle: -90, position: "insideLeft" }} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="value" fill="#8884d8" name={axis2} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
