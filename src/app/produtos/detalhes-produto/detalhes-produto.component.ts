import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificacaoService } from 'src/app/notificacao.service';
import { IProduto,  IProdutoCarrinho } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';
import { CarrinhoService } from 'src/app/carrinho.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  produto: IProduto | undefined;
  quantidade = 1;

  constructor(private produtosService: ProdutosService, 
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
	private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productId = Number(routeParams.get("id"));
    this.produto = this.produtosService.getOne(productId);
  }
  adicionarCarrinho(){
    this.notificacaoService.notificar("Adicionado ao carrinho!");
	const produto: IProdutoCarrinho = {
		...this.produto!,
		quantidadeSelecionada: this.quantidade
	}
	this.carrinhoService.adicionarCarrinho(produto);
  }

}
