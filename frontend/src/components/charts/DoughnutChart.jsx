import { Doughnut } from 'react-chartjs-2'; // Import the Bar chart component from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const DoughnutChart = ({labels, datasetLabel, datasetData, datasetBgColor,
  optionLegendPos = 'bottom', optionTooltipLabel, chartLabel, chartH, chartW}) => {
    const data = {
        labels: labels, 
        datasets: [
        {
            label: datasetLabel, 
            data: datasetData,
            backgroundColor: ['#1f77b4','#ff7f0e', '#2ca02c', '#d62728','#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
            hoverOffset: 4
        },
        ], 
    };

    const options = {
        responsive: true, 
        plugins: {
            legend: {
                position: optionLegendPos,
                labels: {
                    font: {
                        size: 16,
                    }
                }
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
            <h2 className='font-instrument-sans font-semibold text-headline-sm text-raisin-black'>{chartLabel}</h2>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DoughnutChart;