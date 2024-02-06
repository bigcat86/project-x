import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import * as Icon from "react-bootstrap-icons";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function ChartDonut({projects}) {
  
  let count = 0;
  projects.forEach(project => {
    count ++;
  });

  const data = {
    labels: projects.map(project =>project.projectName),
    datasets: [
      {
        label: "% of Workload",
        data: projects.map(project => (1 / count) * 100 ),
        backgroundColor: ["#797ef6", "#4adede", "#1aa7ec", "#1e2f97"],
      },
      {
        label: "project completion %",
        data: projects.map(project => project.completion),
        backgroundColor: ["#0d6efd","#000000", "#f5f5f5"],
        borderColor: ["#000000"],
        borderWidth: 5,
      },
    ],
  };

  return (
    <div className="w-100 mt-3">
        <h3 className="project-title text-start border border-light rounded bg-primary p-3">
        <Icon.GraphUp color="whitesmoke" size={25} /> Performance
      </h3>
    <div id="chart">
      <Doughnut data={data} />
    </div>
    </div>
  );
};
