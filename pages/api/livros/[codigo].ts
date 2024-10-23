import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../classes/controle/ControleLivros';


export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const codigo = Number(req.query.codigo); 

        if (req.method === 'DELETE') {
            const sucesso = ControleLivro.excluir(codigo);

            if (sucesso) {
                res.status(200).json({ mensagem: 'Livro excluído com sucesso' });
            } else {
                res.status(404).json({ erro: 'Livro não encontrado' });
            }
        } else {
            res.setHeader('Allow', ['DELETE']);
            res.status(405).end(`Método ${req.method} não permitido`);
        }
    } catch (error) {
        res.status(500).json({ erro: 'Erro no servidor' });
    }
};
