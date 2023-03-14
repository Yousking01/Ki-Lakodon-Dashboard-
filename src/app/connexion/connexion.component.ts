import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../Services/connexion.service';
import { StorageService } from '../Services/storage.service';
import Swal from 'sweetalert2'
import { AuthService } from '../Services/auth.service';
import { TokenStorageService } from '../Services/token-storage.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  form: any = {
    // username: null,
    // email: null,
    // password: null
    username: '',
    // email: '',
    password: ''
  };
  connexionReussi = false;
  connexionEchoue = false;
  messageErreur = '';

  currentUser: any;
  isLoggedIn: any;
  role: any;
  showAdminBoard: any;
  showModeratorBoard: any;
  username: any;

  eventBusService: any;
  
  roles: string[] = [];
  modal: any;
  status: any;
  constructor( private connexion: ConnexionService,
    private storage: StorageService,
    private router: Router,
    private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.storage.connexionReussi()) {
      this.connexionReussi = true;
      this.roles = this.storage.recupererUser().roles;
    }
  }
  // onSubmit() {

  //   console.log(this.form)
  //   this.authService.login(this.form).subscribe(
  //     data => {console.log(data.accessToken)
  //       localStorage.setItem('token', data.accessToken)
  //       this.tokenStorage.saveUser(data)
  //       this.tokenStorage.saveToken(data.accessToken)
          
  //     },
  //     err  => console.log(err)
  //   );

  onSubmit(): void {
    // const { username, password } = this.form;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: '',
        cancelButton: ''
      },
      heightAuto: false

    })
    console.log(this.form)
    this.authService.login(this.form).subscribe({
      next: data => {
        // this.status = data.status;
        // this.messageErreur = data.message
        if (this.status == false) {
          swalWithBootstrapButtons.fire(
            '',
            `<h1  style='font-size:1.5em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.messageErreur}.</h1>`,
            'error'
          )
        } else{
          // this.storage.enregistrer(data);
          // this.connexionEchoue = false;
          // this.connexionReussi = true;
          // this.storage.connexionReussi();
  
          // this.roles = this.storage.recupererUser().roles;
          console.log(data.accessToken)
            localStorage.setItem('token', data.accessToken)
            this.tokenStorage.saveUser(data)
            this.tokenStorage.saveToken(data.accessToken)
          //this.reloadPage();
          this.router.navigateByUrl("/dashboard")
        }
       
      },
      error: err => {
        this.messageErreur = err.error.message;
        this.connexionEchoue = true;
      }
    });

  }


}