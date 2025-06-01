import React, { createContext, useContext, useState } from 'react';

export interface Produto {
  id: string;
  nome: string;
  price: number;
  image: string;
  quantidade: number;
}

interface CarrinhoContextData {
  carrinho: Produto[];
  adicionarProduto: (produto: Produto) => void;
  removerProduto: (id: string) => void;
  atualizarQuantidade: (id: string, novaQuantidade: number) => void;
  limparCarrinho: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextData | undefined>(undefined);

export const CarrinhoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const adicionarProduto = (produto: Produto) => {
    setCarrinho(prev => {
      const existe = prev.find(p => p.id === produto.id);
      if (existe) {
        return prev.map(p =>
          p.id === produto.id
            ? { ...p, quantidade: p.quantidade + produto.quantidade }
            : p
        );
      }
      return [...prev, produto];
    });
  };

  const removerProduto = (id: string) => {
    setCarrinho(prev => prev.filter(p => p.id !== id));
  };

  const atualizarQuantidade = (id: string, novaQuantidade: number) => {
    if (novaQuantidade <= 0) {
      removerProduto(id);
    } else {
      setCarrinho(prev =>
        prev.map(p =>
          p.id === id ? { ...p, quantidade: novaQuantidade } : p
        )
      );
    }
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarProduto,
        removerProduto,
        atualizarQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
};
