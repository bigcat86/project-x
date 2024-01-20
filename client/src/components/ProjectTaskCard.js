// import React, {useState} from "react";
// import { useMutation, useQuery } from "@apollo/client";
// import { QUERY_TASKS } from "../utils/queries";

// export default function ProjectTaskCard({projects}) {
//     const {
//         data: taskData,
//         loading: taskLoading,
//         error: taskError,
//       } = useQuery(QUERY_TASKS);

//     return (
//     <div>
//        {taskLoading ? (
//        <h3>Loading..</h3>
//        ) : (
//         taskData.map((task) => {
//         return(
//             <div>
//                 <div>
//                     <h3>{task.taskName}</h3>
//                 </div>
//                 <div>
//                     <p>{task.description}</p>
//                 </div>
//             </div>
//         )}))}
//     </div>
// )}
        
