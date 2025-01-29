import { Bar } from 'react-chartjs-2'; // Import the Bar chart component from react-chartjs-2
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
        backgroundColor: datasetBgColor, // Bar color
        borderColor: datasetBorderColor, // Border color
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