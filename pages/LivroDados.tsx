import type { NextPage } from 'next';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../src/app/page.module.css'; 
import ControleEditora from '../classes/controle/ControleEditora';
import { Menu } from '../componentes/Menu';

const controleEditora = new ControleEditora();
const baseURL = "http://localhost:3000/api/livros";

const LivroDados: React.FC = () => {
  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(0);
  const [opcoes, setOpcoes] = useState<any[]>([]); 

  const router = useRouter();

  const incluirLivro = async (livro: any) => { 
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livro),
    });
    return response.ok;
  };

  React.useEffect(() => {
    const fetchEditoras = async () => {
      const editoras = await controleEditora.getEditoras();
      const mappedEditoras = editoras.map((ed: any) => ({
        value: ed.codEditora,
        text: ed.nome,
      }));
      setOpcoes(mappedEditoras);
    };
    fetchEditoras();
  }, []);

  const tratarCombo = (event: ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro = {
      codigo: 0, 
      titulo,
      resumo,
      autores: autores.split('\n'), 
      codEditora,
    };
    const sucesso = await incluirLivro(livro);
    if (sucesso) {
      router.push('/LivroLista');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Incluir Livro</title>
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Incluir Livro</h1>
        <form className={styles.form} onSubmit={incluir}>
          <div>
            <label htmlFor="titulo" className={styles.label}>Título:</label>
            <input
              type="text"
              id="titulo"
              className={styles.input}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="resumo" className={styles.label}>Resumo:</label>
            <textarea
              id="resumo"
              className={styles.textarea}
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="autores" className={styles.label}>Autores (um por linha):</label>
            <textarea
              id="autores"
              className={styles.textarea}
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="codEditora" className={styles.label}>Editora:</label>
            <select id="codEditora" className={styles.select} value={codEditora} onChange={tratarCombo}>
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.button}>Salvar Dados</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;