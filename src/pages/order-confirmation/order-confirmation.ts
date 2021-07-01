import { PedidoService } from './../../services/domain/pedido.service';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codPedido: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService: ClienteService,
    public cartService: CartService,
    public pedidoService: PedidoService,
    public loadingCtrl: LoadingController) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      },
        error => {
          this.navCtrl.setRoot('HomePage');
        });
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total(): number {
    return this.cartService.total();
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout() {
    let loader = this.presentLoading();
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.codPedido = this.extractId(response.headers.get('location'));
        loader.dismiss();
      },
      error => {
        if (error.status == 403) {
          loader.dismiss();
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  private extractId(location: string): string{
    let position  = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
}