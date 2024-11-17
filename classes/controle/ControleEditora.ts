import Editora from '../modelo/Editora'; 


const editoras: Array<Editora> = [
    { codEditora: 1, nome: "Alfa Books" },
    { codEditora: 2, nome: "Pearson" },
    { codEditora: 3, nome: "Addison Wesley" }
];

class ControleEditora {

    getEditoras(): Array<Editora> {
        return editoras;
    }

    getNomeEditora(codEditora: number): string {
        const editora = editoras.filter(editora => editora.codEditora === codEditora)[0];
        return editora ? editora.nome : "Editora não encontrada";
    }
}

export default ControleEditora;
