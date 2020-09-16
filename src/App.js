import React, {useState, useEffect} from 'react';
import api from './services/api';
import './App.css';
import Header from './components/Header';
//import bg from './assets/bg.jpg';

function App(){
    const [projects, setProjects] = useState([]);

    useEffect(()=> {
        api.get('/projects').then(res => {
            setProjects(res.data);
        });
    }, []);

    async function handleAddProject() {
       // setProjects([...projects, `novo Projeto ${Date.now()}`]);
        const res = await api.post('projects', {
            title: `novo Projeto ${Date.now()}`,
            owner: "japavey"
        });

        const project = res.data;

        setProjects([...projects, project]);
        
        console.log(projects);
    } 

    return (
        <>
            <Header title='Projects' />
            <ul>
                {projects.map(project => <li key={project.id} > {project.title} </li>)}
            </ul>

            <button type='button' onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    );
}
export default App;