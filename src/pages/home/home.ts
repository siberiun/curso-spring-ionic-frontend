import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, MenuController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }
  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public loadingCtrl: LoadingController) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    let loader = this.presentLoading();
    this.auth.refreshToken().subscribe(response => {
      this.auth.sucessfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
      loader.dismiss();
      
    },
      error => {
        loader.dismiss();
      });
  }

  login() {

    this.auth.authenticate(this.creds).subscribe(Response => {
      this.auth.sucessfulLogin(Response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    }, error => {
    }
    );

  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

}
