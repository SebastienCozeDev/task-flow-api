"use client";

import { TaskInfo, TaskResponse } from "@/lib/api/tasks-api";

type TaskCardData = {
  task: TaskResponse
}

export default function TaskCard(data: TaskCardData) {
  return (
    <>
      <div key={data.task.id} className="card bg-base-100 w-full shadow-sm mx-auto">
        {
          data.task.imageLink
          ? (
            <figure>
              <img
                src={data.task.imageLink}
                alt="Presentation image" />
            </figure>
          )
          : null
        }
        <div className="card-body">
          <h2 className="card-title">
            {data.task.title}
            {
              data.task.state
              ? <div className="badge badge-secondary">{data.task.state.toUpperCase()}</div>
              : null
            }
          </h2>
          <p>{data.task.decription}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </>
  );
}
