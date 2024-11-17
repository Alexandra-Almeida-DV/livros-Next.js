import type { NextPage, GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import ControleLivro from '../classes/controle/ControleLivros';
import ControleEditora from '../classes/controle/ControleEditora'; 
import { Menu } from '../componentes/Menu';

// Definição das interfaces para tipagem
interface Livro {
  codigo: number;
  titulo: string;
  resumo: string;
  codEditora: number;
  autores: string[];
}

interface LinhaLivroProps {
  livro: Livro;
  nomeEditora: string;
  excluir: (codigo: number) => void;
}

// Componente para renderizar uma linha da tabela de livros
const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, nomeEditora, excluir }) => {
  return (
    <tr>
        <td>
          {livro.titulo}
          <div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => excluir(livro.codigo)}
            >
              Excluir
            </button>
          </div>
        </td>
        <td>{livro.resumo}</td>
        <td>{nomeEditora}</td>
        <td>
          <ul>
            {livro.autores.map((autor, index) => (
              <li key={index}>{autor}</li>
            ))}
          </ul>
        </td>
      </tr>
  );
};

// Interface para as props da página
interface LivroListaProps {
  livrosIniciais: Livro[];
}

// Página principal que lista os livros
const LivroLista: NextPage<LivroListaProps> = ({ livrosIniciais }) => {
  const [livros, setLivros] = useState<Livro[]>(livrosIniciais);
  const [carregado, setCarregado] = useState(false);

  const controleLivro = new ControleLivro();
  const controleEditora = new ControleEditora();

  useEffect(() => {
    if (!carregado) {
      const livrosObtidos = controleLivro.obterLivros();
      setLivros(livrosObtidos);
      setCarregado(true);
    }
  }, [carregado, controleLivro]);

  const excluir = (codigo: number) => {
    controleLivro.excluir(codigo);
    // Atualiza a lista de livros após exclusão
    const livrosAtualizados = controleLivro.obterLivros();
    setLivros(livrosAtualizados);
  };

  return (
    <main className="text-center">
      <Menu />
      <h1>Catálogo de Livros</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered w-75 mx-auto">
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                nomeEditora={controleEditora.getNomeEditora(livro.codEditora)}
                excluir={excluir}
              />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

// Função para pré-carregar os dados no servidor
export const getServerSideProps: GetServerSideProps = async () => {
  const controleLivro = new ControleLivro();
  const livros = controleLivro.obterLivros();

  return {
    props: {
      livrosIniciais: livros,
    },
  };
};

export default LivroLista;
