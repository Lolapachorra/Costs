import ProjectForm from '../Projects/ProjectForm'
import styles from './NewProject.module.css'
import { useNavigate } from 'react-router-dom'
function NewProject(){

    const navigate = useNavigate()

    function createPost(project){
    project.cost = 0
    project.services = []

    fetch("https://json-api-e77p.onrender.com/projects", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    }).then(response => response.json())
      .then(data => {
       
        console.log(data)
        navigate('/projects', { state: { message: "Projeto criado com sucesso!" } });
      })
      .catch(error => console.log(error))
    }
    return(
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto!" />
        </div>
    )
}

export default NewProject