import React from "react";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  return (
    <div className={styles.item}>
      <CheckButton checked={task.isChecked} />
      <div className={`${styles.textContainer} ${task.isChecked ? styles.checked : ""}`}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span>{task.description}</span>}
      </div>
    </div>
  );
}
