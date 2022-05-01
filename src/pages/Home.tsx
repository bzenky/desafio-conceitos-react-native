import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTask = {
  taskId: number
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const taskTitleValidation = tasks.find(task => task.title === newTaskTitle)

    if (taskTitleValidation) {
      return Alert.alert('Tarefa já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome.');
    }

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
    const updatedDoneTasks = tasks.map(task => ({ ...task, done: task.id === id ? !task.done : task.done }))

    setTasks(updatedDoneTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que deseja remover esse item?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => {
          const filteredTask = tasks.filter((task: Task) => task.id !== id)

          setTasks(filteredTask)
        }
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTask) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskToBeUpdated = updatedTasks.filter(task => task.id === taskId)[0]

    if (!taskToBeUpdated)
      return

    taskToBeUpdated.title = taskNewTitle

    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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