import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({labels, datasetLabel, datasetData, datasetBgColor, datasetBorderColor,
  optionLegendPos = 'bottom', optionTooltipLabel, chartLabel, chartH, chartW}) => {
  
    const data = {
    labels: labels, 
    datasets: [
      {
        label: datasetLabel, // Dataset label
        data: datasetData, // Data points
        backgroundColor: ['#1f77b4','#ff7f0e', '#2ca02c', '#d62728','#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
        borderColor: ['#1f77b4','#ff7f0e', '#2ca02c', '#d62728','#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true, 
    plugins: {
      legend: {
        position: optionLegendPos,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw + ' ' + optionTooltipLabel; 
          },
        },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  };

  return (
    <div className={`${chartH} ${chartW}`}>
      <h2>{chartLabel}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;