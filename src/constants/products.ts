export interface Opcao {
  label: string;
  preco: number;
}

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
  tipo: 'camisa' | 'acessorio';
  opcoes?: Opcao[];
}

export const PRODUTOS: Produto[] = [
  {
    id: 'camisa-alavanca-laranja',
    nome: 'Camisa Alavanca Jogo - Laranja',
    preco: 49.90,
    imagem: '/produtos/camisalaranja.png', // Verifique o nome do arquivo na pasta public
    tipo: 'camisa',
    descricao: 'Edição padrão do uniforme Alavanca de jogo para representar a atlética com o seu clássico laranja'
  },
  {
    id: 'camisa-alavanca-preta',
    nome: 'Camisa Alavanca Jogo - Preta',
    preco: 49.90,
    imagem: '/produtos/camisapreta.png',
    tipo: 'camisa',
    descricao: 'O uniforme alternativo da Alavanca, sem perder a essência.'
  },
  {
    id: 'caneca-alavanca-aluminio',
    nome: 'Caneca Alavanca Alumínio',
    preco: 35.00,
    imagem: '/produtos/caneca.png',
    tipo: 'acessorio',
    descricao: 'Caneca de alumínio 500ml com estampa resistente. Ideal para eventos e uso diário.',
    opcoes: [
      { label: 'Caneca', preco: 35.00 },
      { label: 'Tirante', preco: 15.00 },
      { label: 'Caneca + Tirante', preco: 45.00 }
    ]
  }
];