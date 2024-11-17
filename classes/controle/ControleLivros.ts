import Livro from '../modelo/Livros';

const livros: Array<Livro> = [
    {
        codigo: 1,
        codEditora: 1,
        titulo: "Use a cabeça: Java",
        resumo: "Use a cabeça! Java é uma experência completa de aprendizado em programação orientada a objetos(OO) e Java",
        autores: ["Bert Bates", "Kathy iSerra"]
    },
    {
        codigo: 2,
        codEditora: 2,
        titulo: "Java: como programar",
        resumo: "Milhões de alunos e profissionaid aprenderam programação e desenvolvimento de software com os livros Deitel",
        autores: ["Paul Deitel", "Harvey Deitel"]
    },
    {
        codigo: 3,
        codEditora: 3,
        titulo: "Core Jave for the impatient",
        resumo: "eader familiar with Horstmann´s original, two-volume Core-Java books who are looking for comprehensive, but condensed guide to all the new features an functions of Java SE 9 will learn how these new features impact the language and core libraries.",
        autores: ["Cay Horstmann"]
    }
];

class ControleLivro {

    obterLivros(): Array<Livro> {
        return livros;
    }

    incluir(novoLivro: Livro): void {
        const novoCodigo = livros.length > 0 ? Math.max(...livros.map(livro => livro.codigo)) + 1 : 1;
        novoLivro.codigo = novoCodigo;
        livros.push(novoLivro);
    }

    excluir(codigo: number): boolean {
        const livroEncontrado = livros.findIndex(livro => livro.codigo === codigo);
        if (livroEncontrado) {
            return true; 
        }
        return false; 
    }
}

export default ControleLivro;
