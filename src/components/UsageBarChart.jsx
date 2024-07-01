// UsageBarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

export const UsageBarChart = ({ data }) => {
    const usageData = data.map(item => item.meterMaster.items[0]?.consumption_hh.items[0]?.usage);
    const labels = data.map(item => item.meterMaster.items[0]?.meterNo);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Usage',
                data: usageData,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                hoverBorderColor: 'rgba(75,192,192,1)',
            }
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'linear', // specify the scale type here
            },
            y: {
                type: 'linear',
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};