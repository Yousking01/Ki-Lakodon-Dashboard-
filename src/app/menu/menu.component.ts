import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AjoutServiceService } from '../Services/ajout-service.service';
import { AjoutsiteService } from '../Services/ajoutsite.service';
import { AuthService } from '../Services/auth.service';
import { ConnexionService } from '../Services/connexion.service';
import { StorageService } from '../Services/storage.service';
import { TokenStorageService } from '../Services/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  connexionReussi = false;
  connexionEchoue = false;
  form: any = {
    // username: '',
    // email: '',
    // numero: null,
    // password:'123456',
    username: '',
    email: '',
    password:'',
    confirmpassword:'',

  };
  username: string="";
  email: string="";
  password: string="";
  confirmpassword: string="";
  role: string="";

  InscriptionReussi = false;
  Inscriptionechoue = false;
  messageErreur = '';
  roles: string[] = [];
  adminP:any;
  Listerole: any;
  Listekilakodon: any;
  constructor(private ajoutsiteService: AjoutsiteService,private ajouteservice : AjoutServiceService,private authService: AuthService,private tokenStorage: TokenStorageService,private router: Router,private route: Router,private inscription:ConnexionService,private storage: StorageService) { }

  ngOnInit(): void {

    if (this.storage.connexionReussi()) {
      this.connexionReussi = true;
      this.roles = this.storage.recupererUser().roles;
      this.adminP=this.storage.recupererUser().roles=='adminuser';
    }
    // Utilisez l'ID pour récupérer les informations spécifiques à afficher sur la page
    this.authService.listerole().subscribe(data =>{
      this.Listerole = data;
      console.log(data);
    });
    this.ajouteservice.listekilakodon().subscribe(data =>{
      this.Listekilakodon = data;
      console.log(data);
    })
  }
  onSubmit(): void {
    const { username, email, password, confirmpassword, role } = this.form;

    this.authService.register(this.form).subscribe({
      next: data => {
        this.InscriptionReussi = true;
        this.Inscriptionechoue = false;
      },
      error: err => {
        this.messageErreur = err.error.message;
        this.Inscriptionechoue = true;
      }
    });
  }

  logout(): void {
    this.inscription.logout().subscribe({
      next: res => {
        // this.storage.clean();
        // this.route.navigate(['/connexion']);
        this.tokenStorage.clearToken();
        // this.tokenStorage.clearToken();
        this.router.navigate(['/connexion']);
      },
      error: err => {
      }
    });
  }
  onRoleSelect(event: any) {
    console.log('Sélection du rôle:', this.role);
    // console.log('listeeee roleeeeee:', this.Listerole);
     this.role = event.target.value;
    // this.router.navigate(['/inscription', role]);
  }
}
