import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'phosphor-react';

import styles from './Tasks.module.css';
import clipboard from '../assets/clipboard.svg';

import {Task,TodosProps} from './Task.js';

export function TaskList() {

  const [completedTasks, setCompletedTasks] = useState<Number>(0)
  const [tasks, setTasks] = useState<Array<TodosProps>>([]);
  const [textTask, setTaskText] = useState('')

  const createNewTask = (event) => {
    event.preventDefault();

    if (!textTask) {
      alert('O campo não pode ser vazio.');
      return
    }

    const newTask = {
      id: uuidv4(),
      title: textTask,
      isCompleted: false,
      // checked: false
    };
    setTasks([...tasks, newTask])

    setTaskText('')
  };

  function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
    setTaskText(event.target.value)
  }

  function handleCompletedTasks() {
    let count = 0;
    tasks.filter(task => {
      if (task.isCompleted === true) {
        count++;
      }
    })
    setCompletedTasks(count)
  };

  function changeIsComplete(id: string) {
    tasks.map(task => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted
      }
    })
    handleCompletedTasks();
  }

  function handleDeleteTask() {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id;
    })
    tasks.map(task => {
      if (task.id === id && task.isCompleted === true) {
        changeIsComplete(id)
      }
    })

    setTasks(tasksWithoutDeletedOne)
  }

  return (
    <main>
      <div className={styles.taskForm}>
        <form onSubmit={createNewTask}>
          <input
            name="task"
            type='text'
            placeholder='Adicione uma nova tarefa'
            className={styles.content}
            value={textTask}
            onChange={handleTextChange}

          />
          <button
            type="submit"
            className={styles.btn}>
            Criar
            <PlusCircle
            />
          </button>
        </form>
      </div>

      <div className={styles.overviewBox}>
        <section className={styles.overview}>
          <div className={styles.counter}>
            <p>Tarefas criadas</p>
            <span>{tasks.length}</span>
          </div>
          <div className={styles.counterTwo}>
            <p>Concluídas</p>
            <span>{completedTasks}</span>
          </div>
        </section>
      </div>
      {
        tasks.length > 0 ? (
          tasks.map(task => {
            return (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                onChangeIsComplete={changeIsComplete}
                onDeleteTask={handleDeleteTask}
                isCompleted={task.isCompleted}
              />
            )
          })
        ) : (
          <article className={styles.noTasks}>
            <div className={styles.tasksContainer}>
              <img src={clipboard} alt='clipboard' />
              <p>Você ainda não tem tarefas cadastradas</p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          </article>

        )
      }
    </main>
  )
}

