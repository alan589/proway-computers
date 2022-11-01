import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itensDoCarrinho: IProdutoCarrinho[] = [];
  total = 0;
  
  constructor(public carrinhoService: CarrinhoService, private router: Router) { }

  ngOnInit(): void {
    this.itensDoCarrinho = this.carrinhoService.obtemCarrinho();
	this.calcularTotal();

  }
  
  calcularTotal(){
	this.total = this.itensDoCarrinho.reduce((prev, cur) => prev + (cur.preco * cur.quantidadeSelecionada), 0);
  }
  
  removerProdutoCarrinho(idCarrinho: number){
	this.itensDoCarrinho = this.itensDoCarrinho.filter(item => item.id !== idCarrinho);
	this.carrinhoService.removerProdutoCarrinho(idCarrinho);
	this.calcularTotal();
  
  }
  
  
  comprar(){
	alert("Parabéns! você finalizou sua compra.")
	this.carrinhoService.limparCarrinho();
	this.router.navigate(["produtos"]);
  }

}
