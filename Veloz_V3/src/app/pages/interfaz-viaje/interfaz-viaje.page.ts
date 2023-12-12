import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbservicioService } from 'src/app/services/dbservicio.service';

@Component({
  selector: 'app-interfaz-viaje',
  templateUrl: './interfaz-viaje.page.html',
  styleUrls: ['./interfaz-viaje.page.scss'],
})
export class InterfazViajePage implements OnInit {

  usuario:any;
  auto:any;
  viaje:any;
  
  IdUsuario:any;

  constructor(private alertController: AlertController, private router: Router,private db: DbservicioService) { }

  ngOnInit() {
    this.IdUsuario = localStorage.getItem('idUsuario')
    this.db.bdState().subscribe(res=>{
      if(res){
        this.db.fetchViajeUnico().subscribe(datos=>{
          this.viaje = datos;
        })
        this.db.fetchAutoUnico().subscribe(datos=>{
          this.auto = datos;
        })
        this.db.fetchUsuarioUnico().subscribe(datos=>{
          this.usuario = datos;
        })
      }
    })
  }

  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: 'Iniciando Viaje',
      subHeader: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
  cancelar() {
    this.router.navigate(['/home']);
  }
}
