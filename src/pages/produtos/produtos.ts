import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public http: HttpClient,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        this.loadImageUrl(start, end);
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
      },
        error => {
          loader.dismiss();
        });
  }

  loadImageUrl(start: number, end: number) {
    for (var i = start; i <= end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
        error => { });
    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(event) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  doInfinite(event) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      event.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      //if (data.length == 1000) {
      //  event.target.disabled = true;
      //}
    }, 1000);
  }

}
