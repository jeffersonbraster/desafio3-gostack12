import React, {useEffect} from "react";

import "./styles.css";
import { useState } from "react";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio node.js ${Date.now()}`,
      url: 'https://github.com/lianasabino',
      techs: 'REACTJS'
    });

    const repositores = response.data;

    setRepositories([...repositories, repositores]);
  }

  async function handleRemoveRepository(id) {
   await api.delete(`repositories/${id}`);

   
   //const filterRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(repositories.filter(repository => repository.id !== id));
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositore => (
          <li key={repositore.id}>
            {repositore.title}
          <button onClick={() => handleRemoveRepository(repositore.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
