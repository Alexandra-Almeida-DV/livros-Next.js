import { NextApiRequest, NextApiResponse } from 'next';
import controleEditora from '../../../classes/controle/ControleEditora';

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const codEditora = Number(req.query.codEditora); // Recupera o codEditora e converte para número

        if (req.method === 'GET') {
            const nomeEditora = controleEditora.getNomeEditora(codEditora);

            if (nomeEditora) {
                res.status(200).json({ nome: nomeEditora });
            } else {
                res.status(404).json({ erro: 'Editora não encontrada' });
            }
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Método ${req.method} não permitido`);
        }
    } catch (error) {
        res.status(500).json({ erro: 'Erro no servidor' });
    }
};
