import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
	const [projects, setProjects] = useState([]);
	const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

	useEffect(() => {
		api.get('repositories').then(response => {
			setProjects(response.data);
		})
	}, []);

  async function handleAddRepository(e) {
		e.preventDefault();
		const dados = {
			title,
			url,
			techs: techs.split(","),
		};
		const { data } = await api.post('repositories', dados);

		const project = data;
		setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {

		try {
      await api.delete(`repositories/${id}`);
			const results = projects.filter(project => project.id !== id);
			console.log(results);
      setProjects(results);
    } catch (e) {
      console.error("Error: ", e);
		}

  }

  return (
    <div>
      <ul data-testid="repository-list">
				{
					projects.map(project =>
						<li key={project.id}>
							{project.title}
							<button onClick={() => handleRemoveRepository(project.id)}>
							Remover
						</button>
						</li>
					)
				}
      </ul>

			<hr />
      <form onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <input
          type="text"
          placeholder="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
        <input
          type="text"
          placeholder="Techs"
          onChange={({ target }) => setTechs(target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default App;
