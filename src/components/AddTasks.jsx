import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ListTasks from './ListTasks';

import styles from './addTask.module.css'

import imageEmpty from '../../public/clipboard.svg'
import iconButton from '../../public/icon-button.svg'
import iconDelete from '../../public/icon-delete.svg'



function AddTasks() {

  const notify = () => toast("seu input esta vazio, digite alguma task!");
  
  const [checked, setChecked] = useState(Number)
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
  const handleCheck = () => {
    if(checked === quantityTasksCreated){
      setChecked(0)
    }else{
      setChecked(checked + 1)
    }
  }

  const handleDelete = (index) => {
    const tasks = saveDisplayTextClickButton.filter((task, i) => i !== index)
    setSaveDisplayTextClickButton(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const saveMap = saveDisplayTextClickButton.map((task, index) => {
    return (
      <div key={index} className={styles.listText}>
        <input type="radio" onClick={handleCheck} />
        <ListTasks task={task} />
        <ToastContainer autoClose={3000}/>
        <a onClick={() => handleDelete(index)}><img src={iconDelete} alt="icon delete" /></a>
      </div>
    )
  })

  return (
    <>
      <div className={styles.inputContent}>
        <input className={styles.inputHeader} type="text" value={saveTextInput} onChange={handleChange}/>
        <button type="submit" className={styles.addButton} onClick={handleClick}>Criar <img src={iconButton} alt="" /></button>
      </div>
        <div className={styles.infoQuantityTasks}>
          <p>Tarefas criadas: <span>{quantityTasksCreated}</span></p>
            <p>Tarefas concluidas: <span>{checked}</span></p>
        </div>
      <div className={styles.stateInTheTasks}>
        <div className={styles.itemsCreated}>
          {saveDisplayTextClickButton.length > 0 ? (
            saveMap
          ) :
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