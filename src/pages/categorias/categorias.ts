import { ProdutosPage } from './../produtos/produtos';
import { API_CONFIG } from './../../config/api.config';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoraService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoraService.findAll()
      .subscribe(response => { this.items = response; },
        error => { });
  }

  showProdutos(categoria_id: string) {
    this.navCtrl.push('ProdutosPage', { categoria_id: categoria_id });
  }


}

