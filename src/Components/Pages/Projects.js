import styles from './Projects.module.css'
import Message from '../Layout/Message';
import {useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Container from '../Layout/Container';
import LinkButton from '../Layout/LinkButton';
import ProjectCard from '../Projects/ProjectCard';
import Load from '../Layout/Load';
function Projects(){
   const [projects, setProjects] = useState([])
   const [removeLoading, setRemoveLoading] = useState(false)
   const [projectMessage, setProjectMessage] = useState('')

    useEffect(() => {
        setTimeout(() => {
    fetch("https://json-api-e77p.onrender.com/projects", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
            setProjects(data);
            setRemoveLoading(true);
        } else {
            console.error("Dados inesperados:", data);
        }
        
        console.log(data)
      })
     .catch(err => console.log(err));
    }, 1000)
    }, []);

    function removeProject(id){
        fetch(`https://json-api-e77p.onrender.com/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json)
          .then(data => {
            setProjects(projects.filter((project => project.id !== id)))
            //mesagem
            setProjectMessage('Projeto excluído com sucesso!')
            
            
          })
          .catch(err => console.error(err))
    }
    
    const location = useLocation();
    let message = ''
    if(location.state){
        message = location.state.message
    }
    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to="/NewProject" text="Criar Projeto"/>
            </div>
        {message && <Message type="sucess" msg={message} />}
        {projectMessage && <Message type="sucess" msg={projectMessage} />}
        <Container customClass="start">
            {projects.length > 0 && 
                projects.map((project) => (
                   <ProjectCard 
                   key={project.id} 
                   name={project.name || 'Nome indisponível'}
                   budget={project.budget || 0}
                   category={project.category?.name || 'Categoria não definida'}
                   id={project.id}
                   handleRemove={removeProject}
                   />
                ))}
               {!removeLoading && <Load />}
               {removeLoading && projects.length === 0 && (
                <p>Você não possui nenhum projeto cadastrado.</p>
                
               )
               
               }
        </Container>
        </div>
    )
}

export default Projects