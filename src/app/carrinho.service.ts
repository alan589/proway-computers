import { Injectable } from '@angular/core';
import { IProdutoCarrinho } from './produtos';
@Injectable({
  providedIn: 'root'
})


export class CarrinhoService {
  itens: IProdutoCarrinho [] = [];
  constructor() {
	const produtos = JSON.parse(localStorage.getItem("carrinho") || "");
	if(produtos) this.itens = produtos;
	
  }
  obtemCarrinho(){
	return JSON.parse(localStorage.getItem("carrinho") || "");
  }
  adicionarCarrinho(produto: IProdutoCarrinho){
	this.itens.push(produto);
	localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }
  
  limparCarrinho(){
	this.itens = [];
	localStorage.clear();
  }
}
