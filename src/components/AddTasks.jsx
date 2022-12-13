import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ListTasks from './ListTasks';

import styles from './addTask.module.css'

import imageEmpty from '../../public/clipboard.svg'
import iconButton from '../../public/icon-button.svg'



function AddTasks() {

  const notify = () => toast("seu input esta vazio, digite alguma task!");

  const [saveTextInput, setSaveTextInput] = useState('')
  const [saveDisplayTextClickButton, setSaveDisplayTextClickButton] = useState([])

  const handleChange = (event) => {
    const {value} = event.target
    setSaveTextInput(value)
  }

  const handleClick = () => {
    const saveValueTextFinally = saveTextInput
    if(saveValueTextFinally === ''){
      notify()
    }else{
      setSaveDisplayTextClickButton([...saveDisplayTextClickButton, saveValueTextFinally])
      localStorage.setItem('tasks', JSON.stringify([...saveDisplayTextClickButton, saveValueTextFinally]))
      setSaveTextInput('')
    }
  }

  useEffect(() => {
    const tasks = localStorage.getItem('tasks')
    if(tasks){
      setSaveDisplayTextClickButton(JSON.parse(tasks))
    }
  }, [])

  const quantityTasksCreated = saveDisplayTextClickButton.length

  // const handleDelete = (index) => {
  //   const tasks = saveDisplayTextClickButton.filter((task, i) => i !== index)
  //   setSaveDisplayTextClickButton(tasks)
  //   localStorage.setItem('tasks', JSON.stringify(tasks))
  // }

  return (
    <>
      <div className={styles.inputContent}>
        <input className={styles.inputHeader} type="text" value={saveTextInput} onChange={handleChange}/>
        <button type="submit" className={styles.addButton} onClick={handleClick}>Criar <img src={iconButton} alt="" /></button>
      </div>
        <div className={styles.infoQuantityTasks}>
          <p>Tarefas criadas: <span>{quantityTasksCreated}</span></p>
          <p>Concluidas: <span>0</span></p>
        </div>
      <div className={styles.stateInTheTasks}>
        <div className={styles.itemsCreated}>
          {saveDisplayTextClickButton.length > 0 ? (
            saveDisplayTextClickButton.map((task, index) =>
            <div key={index} className={styles.listText}>
              <ListTasks task={task} />
              <ToastContainer autoClose={3000}/>
            </div>
            )) :
            <form className={styles.formTasks} >
              <div className={styles.tasksEmpty}>
                <img src={imageEmpty} alt="Image form empty"></img>
                <p>Você ainda não tem tarefas cadastradas<br></br>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </form>
          }
        </div>
      </div>
    </>
  )
}

export default AddTasks