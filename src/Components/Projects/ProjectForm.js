import {useState, useEffect } from 'react'
import Input from '../Form/input';
import Select from '../Form/Select';
import Submit from '../Form/Submit';
import styles from './ProjectForm.module.css'
function ProjectForm({handleSubmit, btnText, projectData}) {

const [categories, setCategories] = useState([])
const [project, setProject] = useState(projectData || [])

useEffect(() => {
  fetch('https://json-api-e77p.onrender.com/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 .then(response => response.json())
 .then(data => {
  setCategories(data)
})
 .catch(error => console.error('Error:', error))
 }, [])

 function submit(e) {
  e.preventDefault();
  handleSubmit(project);
 }

 function handleChange(e) {
  setProject({...project, [e.target.name]: e.target.value });
  console.log(project)
 }
 function handleCategory(e) {
  setProject({...project, category: {
    id: e.target.value,
    name: e.target.options[e.target.selectedIndex].text,

  }
 });
  console.log(project)
 }
  
    return (
        <form onSubmit={submit} className={styles.form}>
           <Input type="text"
            text="Nome do projeto"
             name="name"
             placeholder="Insira o nome do projeto" 
             handleOnChange={handleChange}
             value={project.name ? project.name : ''}
             />
             
         <Input type="number"
            text="Orçamento do projeto"
             name="budget"
             placeholder="Insira o orçamento total" 
             handleOnChange={handleChange}
             value={project.budget ? project.budget : ''}
             />
             
             
          <Select name="category_id"
           text="Selecione a Categoria"
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}
            />
          <Submit text={btnText} />
        </form>
    )
}

export default ProjectForm;