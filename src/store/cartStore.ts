import { create } from 'zustand';

// Definimos o formato exato de um produto no nosso carrinho
export interface CartItem {
  id: string;
  nome: string;
  preco: number;
  tamanho: string;
  nomePersonalizado?: string;
  numeroPersonalizado?: string;
  quantidade: number;
}

// Definimos o que o nosso carrinho sabe fazer
interface CartStore {
  items: CartItem[];
  adicionarItem: (item: CartItem) => void;
  removerItem: (id: string) => void;
  limparCarrinho: () => void;
}

// Criamos a "memória" global
export const useCartStore = create<CartStore>((set) => ({
  items: [],
  
  adicionarItem: (novoItem) => set((state) => {
    return { items: [...state.items, novoItem] };
  }),

  removerItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),

  limparCarrinho: () => set({ items: [] }),
}));