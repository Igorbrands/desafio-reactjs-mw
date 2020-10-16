import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiBook } from 'react-icons/fi';

import api from '../../services/api';

import { Title, Form, Users, Error } from './styles';

import logoImg from '../../assets/logo.svg';

interface User {
  login: string;
  bio: string;
  avatar_url: string;
  location: string;
  public_repos: number;
}

const Dashboard: React.FC = () => {
  const [newUser, setNewUser] = useState('');
  const [inputError, setInputError] = useState('');

  const [users, setUsers] = useState<User[]>(() => {
    const storagedUsers = localStorage.getItem('@GithubExplorer:users');

    if (storagedUsers) {
      return JSON.parse(storagedUsers);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:users', JSON.stringify(users));
  }, [users]);

  // Adição de um novo user
  // Consumir API do GH
  // Salvar novo user no estado
  async function handleAddUser(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newUser) {
      setInputError('Digite o login/nome do usuário');
      return;
    }

    try {
      const response = await api.get<User>(`users/${newUser}`);

      const user = response.data;

      setUsers([...users, user]);
      setNewUser('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse usuário');
    }
  }
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore usuários e seus repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddUser}>
        <input
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
          placeholder="Digite o nome do usuário"
        />
        <button type="submit">Pesquisar </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Users>
        {users.map(user => (
          <Link key={user.login} to={`/users/${user.login}`}>
            <img src={user.avatar_url} alt={user.login} />
            <div>
              <strong>{user.login}</strong>
              <br />
              <FiBook color="#fff" size={20} />
              <strong> {user.public_repos}</strong>
              <p>{user.location}</p>
              <p>{user.bio}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Users>
    </>
  );
};

export default Dashboard;
