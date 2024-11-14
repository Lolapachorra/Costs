import {parse, v4 as uuidv4} from 'uuid'
import styles from './project.module.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Load from '../Layout/Load';
import Container from '../Layout/Container';
import ProjectForm from './ProjectForm';
import Message from '../Layout/Message';
import ServiceForm from '../Service/ServiceForm';
import ServiceCard from '../Service/ServiceCard';
function Project() {
   const { id } = useParams();
   const [showProjectForm, setshowProjectForm] = useState(false)
   const [showServiceForm, setshowServiceForm] = useState(false)
   const [project, setProject] = useState([]);
   const [message, setMessage] = useState()
   const [type, setType] = useState()
   const [services, setService] = useState([])
   console.log(id)

   useEffect(() => {
        setTimeout(() => {
        fetch(`https://json-api-e77p.onrender.com/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
          .then((data => {
            setProject(data)
            setService(data.services)
          }))
          .catch(err => console.log(err))
        }, 1000)
   }, [id])

   function toggleProjectForm(){
     setshowProjectForm(!showProjectForm)
     console.log(showProjectForm)
   }
   
   function toggleServiceForm(){
    setshowServiceForm(!showServiceForm)
    console.log(showProjectForm)
  }

  function createService(project){
    setMessage('')
    
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()
    
    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost) 
    if(newCost > parseFloat(project.budget)){
        setMessage("Orçamento ultrapassado, verifique o valor do serviço!")
        setType("error")
        project.services.pop()
        return false
    }

    project.cost = newCost
    console.log(`Project ID: ${project.id}`)
    
    fetch(`https://json-api-e77p.onrender.com/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
  }).then(response => response.json())
    .then((data) => {
        setshowServiceForm(false)
        console.log(data)
    })
    .catch(err => console.log(err));
  }

  function removeService(id,cost){
    setMessage('')
    const servicesUpdate = project.services.filter(
        (services) => services.id !== id
    )

    const projectsUpdate = project

    projectsUpdate.services = servicesUpdate
    projectsUpdate.cost = parseFloat(projectsUpdate.cost) - parseFloat(cost)

    fetch(`https://json-api-e77p.onrender.com/projects/${projectsUpdate.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectsUpdate)
    }).then(response => response.json())
      .then(data => {
        setProject(projectsUpdate)
        setService(servicesUpdate)
        setMessage("Serviço excluído com sucesso")
      })
       .catch(err => console.error(err))
  }

   function editPost(project){
    setMessage('')
        if(project.budget < project.cost){
          setMessage("Orçamento não pode ser menor que o total gasto!")
          setType("error")
        return false
        
   }
   fetch(`https://json-api-e77p.onrender.com/projects/${project.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
   })
     .then(response => response.json())
     .then((data) => {
        setProject(data)
        setshowProjectForm(false)
        setMessage("Projeto atualizado")
        setType("sucess")
     })
    .catch(err => console.log(err))
    }


   return (<>
       {project.name ? (
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message} />}
             <div className={styles.details_container}>
                <h1>Projeto: {project.name}</h1>
                <button className={styles.btn} onClick={toggleProjectForm} >
                    {!showProjectForm ? "Editar projeto" : "Fechar"}
                    </button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                            <span>Categoria:</span> {project.category.name}
                            </p>
                            <p>
                             <span>Orçamento:</span> R${project.budget}
                            </p>
                            <p>
                                <span>Total utilizado:</span> R${project.cost}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.project_info}>
                            
                            <ProjectForm handleSubmit={editPost}
                             btnText="Concluir Edição" 
                             projectData={project}/>
                            </div>
                    )}
             </div>
             <div className={styles.service_form_container}>
                <h2>Adicione um serviço</h2>
                <button className={styles.btn} onClick={toggleServiceForm} >
                    {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
                    </button>
                    <div className={styles.project_info}>
                        {showServiceForm && 
                        <ServiceForm 
                        handleSubmit={createService}
                        btnText="Adicionar Serviço"
                        projectData={project}
                        />
                        }
                    </div>
             </div>
             <h2>Serviços</h2>
             <Container customClass="start">
                {services.length > 0 &&
                services.map((service) => (
                    <ServiceCard 
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                    />
                ))
            }
                {services.lenght === 0 && <p>Não há serviços cadastrados</p>}
             </Container>
            </Container>
        </div>
       ) : (
        <Load />
       )}
   </>)
   
}

export default Project;