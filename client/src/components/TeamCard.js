import React from "react";


export default function TeamCard({teammates, teams}) {
 

  return (

    <div>
    {teammates.length > 0 ? (
      <div className="project-title border border-light rounded bg-primary p-3 d-flex flex-column align-items-start">
        {teammates.map((user) => {
          return (
            <div className="d-flex" key={user.username}>
              <img
                src={user.image}
                alt="logo"
                className="rounded-circle"
                width="50"
                height="50"
              />
              <p className="mx-3">{user.username}</p>
            </div>
          );
        }
        )}
      </div>
    ) : (
      <h3>No Teams Yet</h3>
    )}
    </div>
  );
}
