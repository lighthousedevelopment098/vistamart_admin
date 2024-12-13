import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import './UserOverviewChart.css'; // Assuming you have a CSS file for custom styles

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Customer', 'Vendor', 'Delivery man'],
  datasets: [
    {
      data: [9, 10, 4], // Data values for each segment
      backgroundColor: ['#017EFA', '#51CBFF', '#56E7E7'],
      borderColor: ['#ffffff', '#ffffff', '#ffffff'],
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // We will create a custom legend
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.label || '';
          if (label) {
            label += `: ${context.raw} users`;
          }
          return label;
        },
      },
    },
  },
  cutout: '60%', // Adjust to make it look more like a donut
};

const UserOverviewChart = () => {
  return (
    <div className="card remove-card-shadow h-100">
      <div className="card-header">
        <h4 className="d-flex align-items-center text-capitalize gap-10 mb-0">
          User Overview
        </h4>
      </div>
      <div className="card-body justify-content-center d-flex flex-column">
        <div className="position-relative">
          <div className="chart-container">
            <Doughnut data={data} options={options} />
          </div>
          <div className="total-orders">
            <h3>23</h3>
            <span>User</span>
          </div>
        </div>
        <div className="apex-legends flex-column">
          <div className="legend-item before-bg-017EFA">
            <span>Customer (9)</span>
          </div>
          <div className="legend-item before-bg-51CBFF">
            <span className="text-capitalize">Vendor (10)</span>
          </div>
          <div className="legend-item before-bg-56E7E7">
            <span className="text-capitalize">Delivery man (4)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverviewChart;
