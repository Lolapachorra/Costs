import { Link } from 'react-router-dom'
import Container from './Container';
import styles from './NavBar.module.css'
import logo from '../../img/costs_logo.png'
function NavBar(){
return(
    <nav className={styles.navbar}>
        <Container>
        <Link to="/"><img src={logo} alt="Costs" /></Link>
           <ul className={styles.list}>
             <li className={styles.item}><Link to="/">Home</Link></li>
             <li className={styles.item}><Link to="/contato">Contato</Link></li>
             <li className={styles.item}><Link to="/empresa">Empresa</Link></li>
             <li className={styles.item}><Link to="/Projects"> Projetos</Link></li>
           </ul>
    </Container>
    </nav>
     
 
)
    

}

export default NavBar;