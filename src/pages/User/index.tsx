import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiBook } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Repos } from './styles';

interface UserParams {
  user: string;
}

interface User {
  login: string;
  bio: string;
  avatar_url: string;
  location: string;
  public_repos: number;
}

interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
}

const User: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);

  const { params } = useRouteMatch<UserParams>();

  useEffect(() => {
    api.get(`users/${params.user}`).then(response => {
      setUser(response.data);
    });
    api.get(`users/${params.user}/repos`).then(response => {
      setRepos(response.data);
    });
  }, [params.user]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="GitHub Explorer" />
        <Link to="/">
          <FiChevronLeft size={20} />
          Voltar
        </Link>
      </Header>

      {user && (
        <RepositoryInfo>
          <header>
            <img src={user.avatar_url} alt={user.login} />
            <div>
              <strong>{user.login}</strong>
              <p>{user.location}</p>
              <p>{user.bio}</p>
            </div>
          </header>
          <ul>
            <li>
              <FiBook color="#fff" size={20} />
              <strong>{user.public_repos}</strong>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Repos>
        {repos.map(repo => (
          <a key={repo.id} href={repo.html_url} target="blank">
            <div>
              <strong>{repo.name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repos>
    </>
  );
};

export default User;
