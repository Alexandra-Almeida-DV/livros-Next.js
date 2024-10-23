import Head from 'next/head';
import styles from '../src/app/page.module.css'
import { Menu } from '../componentes/Menu'; 

const Home = () => {
  return (
    <div className="container">
      <Head>
        <title>Aplicativo com Next.Js</title>
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>Página Inicial</h1>
      </main>
    </div>
  );
};

export default Home;
