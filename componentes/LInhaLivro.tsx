import React from 'react';
import Livro from '../classes/modelo/Livros'; 
import ControleEditora from '../classes/controle/ControleEditora';

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
    livro: Livro;
    excluir: () => void;
  }
  
  export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
    const { livro, excluir } = props;
    const nomeEditora = ControleEditora.getNomeEditora(livro.codEditora);
  
    return (
      <tr>
        <td>{livro.titulo}</td>
        <td>{livro.autores}</td>
        <td>{nomeEditora}</td>
        <td>
          <button className="btn btn-danger" onClick={excluir}>
            Excluir
          </button>
        </td>
      </tr>
    );
  };

