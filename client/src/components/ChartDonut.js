import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import * as Icon from "react-bootstrap-icons";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Blue", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [60, 40],
      backgroundColor: ["#0d6efd", "rgba(255, 206, 86, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)", "rgba(0, 0, 0, 1)"],
      borderWidth: 1,
    },
  ],
};

export default function ChartDonut() {
  return (
    <div className="w-100">
        <h3 className="project-title text-start border border-light rounded bg-primary p-3">
        <Icon.GraphUp color="whitesmoke" size={25} /> Performance
      </h3>
    <div id="chart">
      

      <Doughnut data={data} />
    </div>
    </div>
  );
}
