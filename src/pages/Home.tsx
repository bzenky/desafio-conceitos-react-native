import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedDoneTasks = tasks.map(task => ({ ...task, done: task.id === id ? !task.done : task.done }));

    setTasks(updatedDoneTasks);
  }

  function handleRemoveTask(id: number) {
    const filteredTask = tasks.filter((task: Task) => task.id !== id)

    setTasks(filteredTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})