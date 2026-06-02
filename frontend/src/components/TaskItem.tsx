import { Dialog } from "@tritonse/tse-constellation";
import React, { useState } from "react";
import { updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [errorModalMessage, setErrorModalMessage] = useState<string | null>(null);

  const handleToggleCheck = async () => {
    setLoading(true);

    try {
      const result = await updateTask({ ...task, isChecked: !task.isChecked });
      if (result.success) {
        setTask(result.data);
      } else {
        setErrorModalMessage(result.error);
      }
    } catch (error) {
      setErrorModalMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.item}>
      <CheckButton
        checked={task.isChecked}
        onPress={() => {
          void handleToggleCheck();
        }}
        disabled={isLoading}
      />
      <div className={`${styles.textContainer} ${task.isChecked ? styles.checked : ""}`}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span>{task.description}</span>}
      </div>
      {errorModalMessage && (
        <Dialog
          isOpen={!!errorModalMessage}
          onClose={() => setErrorModalMessage(null)}
          message={errorModalMessage}
        />
      )}
    </div>
  );
}
