import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Collection',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    }
  },
};

export function Plot({data}) {

    const getData = (filter) =>{
        let total = 0;
        const arr = [];
        data.forEach(d => {
            if(d.side === filter){
                arr.push(d.amount + total);
                total = total + d.amount;
            }
        })
        return arr;
    }
    
    const labels = data.map((m,i)=>{
        return i;
    });
    
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Bride',
          data: getData("Bride"),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Groom',
          data: getData("Groom"),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          yAxisID: 'y',
        },
      ],
    };
  return (
    <div style={{ width:"40vw"}}>
        <Line options={options} data={chartData} />
    </div>
    );
}
