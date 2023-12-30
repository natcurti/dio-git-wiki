import gitLogo from '../assets/github.png';
import { Container } from './styles';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { useState } from 'react';
import Button from '../components/Button';
import { api } from '../services/api';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);
  
  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`);

    if(data.id){
      const isExist = repos.find(repo => repo.id === data.id);
      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return;
      }
    }
    alert('Repositório não encontrado');
  }

  const handleRemoveRepo = (id) => {
    const reposToShow = repos.filter(item => item.id !== id);
    setRepos([...reposToShow]);
  }

  return (
    <Container className="App">
      <img src={gitLogo} width={72} height={72} alt="Logo GitHub"/>
      <Input value={currentRepo} onChange={event => setCurrentRepo(event.target.value)}/>
      <Button title="Buscar" onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
