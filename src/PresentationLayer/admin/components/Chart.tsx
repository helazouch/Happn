import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./Chart.css";
import { 
  EventRepository 
} from "../../../DataLayer/repositories/EventRepository";
import {  
  CategoryRepository
} from "../../../DataLayer/repositories/CategoryRepository";

interface ChartProps {
  axis1: string; // 'category' ou 'events'
  axis2: string; // 'nbr participant' ou 'nbr events'
}

interface ChartData {
  [key: string]: string | number;
}

const Chart: React.FC<ChartProps> = ({ axis1, axis2 }) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let newData: ChartData[] = [];
        
        if (axis1 === 'category' && axis2 === 'nbr participant') {
          const categories = await CategoryRepository.getCategoriesWithParticipantCount();
          newData = categories.map(c => ({
            name: c.name,
            value: c.participantCount
          }));
        } 
        else if (axis1 === 'category' && axis2 === 'nbr events') {
          const categories = await CategoryRepository.getCategoriesWithEventCount();
          newData = categories.map(c => ({
            name: c.name,
            value: c.eventCount
          }));
        }
        else if (axis1 === 'events' && axis2 === 'nbr participant') {
          const events = await EventRepository.getEventsWithParticipantCount();
          newData = events.map((e: { name: any; participantCount: any; }) => ({
            name: e.name,
            value: e.participantCount
          }));
        }

        setData(newData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axis1, axis2]);

  const getXAxisLabel = () => {
    switch (axis1) {
      case 'category': return 'Catégories';
      case 'events': return 'Événements';
      default: return axis1;
    }
  };

  const getYAxisLabel = () => {
    switch (axis2) {
      case 'nbr participant': return 'Nombre de participants';
      case 'nbr events': return "Nombre d'événements";
      default: return axis2;
    }
  };

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (data.length === 0) {
    return <div>Aucune donnée disponible pour cette combinaison d'axes</div>;
  }

  return (
    <div style={{
      width: "90%", 
      height: 400,     
      marginTop: 80,
      marginLeft: 50,
      marginRight: 50,
      paddingBottom: 30,
    }}>
      <h3 style={{ textAlign: 'center' }}>
        {getXAxisLabel()} vs {getYAxisLabel()}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            label={{ 
              value: getXAxisLabel(), 
              position: "insideBottom", 
              offset: -5 
            }} 
          />
          <YAxis 
            label={{ 
              value: getYAxisLabel(), 
              angle: -90, 
              position: "insideLeft" 
            }} 
          />
          <Tooltip 
            formatter={(value: number) => [value, getYAxisLabel()]}
            labelFormatter={(label) => `${getXAxisLabel()}: ${label}`}
          />
          <Bar 
            dataKey="value" 
            fill="#8884d8" 
            name={getYAxisLabel()} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;