import styles from './header.module.css'

import logo from '../../public/logo.svg'
import AddTasks from './AddTasks';
import ListTasks from './ListTasks';

function Header(){
  return(
    <>
      <header className={styles.headerContainer}>
        <img src={logo} alt="" />
        <AddTasks />
      </header>
      <section>
        <ListTasks />
      </section>
    </>
  )
}

export default Header;