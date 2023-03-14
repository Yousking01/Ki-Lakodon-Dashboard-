import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import Chart from 'chart.js/auto';
import { StorageService } from '../Services/storage.service';
import { ConnexionService } from '../Services/connexion.service';
import { AfficherService } from '../Services/afficher.service';
import { AjoutServiceService } from '../Services/ajout-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  form: any = {
    username: null,
    password: null
  };
  connexionReussi = false;
  connexionEchoue = false;
  messageErreur = '';

  currentUser: any; isLoggedIn: any; role: any; showAdminBoard: any; showModeratorBoard: any;
  username: any;
  eventBusService: any;

  roles: string[] = [];
  menuBureau: boolean = true;
  menuMobile: boolean = false;

  public chart: any;
  afficheruser: any;
  jan: number = 0; fe: number = 0; mar: number = 0; av: number = 0; mai: number = 0; jui: number = 0;
  au: number = 0; sep: number = 0; oct: number = 0; nov: number = 0; dec: number = 0; juil: number = 0;
  challenge: any; encours: any; terminer: any; avenir: any; listuser: any; avenir1: any;
  fervrier: any; juin: any; janvier: any; mars: any; avril: any; mai1: any; juillet: any; aout: any; septembre: any;
  octobre: any; novembre: any; decembre: any; categorie: any; challengeS: any; ch12: number = 0;
  ch1: number = 0; ch6: number = 0; ch9: number = 0; ch2: number = 0; ch3: number = 0; ch4: number = 0;
  ch5: number = 0; ch7: number = 0; ch8: number = 0; ch10: number = 0; ch11: number = 0; ch13: number = 0;
  ListeAnnonceur: any;
  // afficheruser: any;
  // listuser: any;

  constructor(
    private ajouteservice : AjoutServiceService,
    public breakpointObserver: BreakpointObserver,
    private route: Router, private connexion: ConnexionService,
    private storage: StorageService, private serviceAfficher: AfficherService) { }

  actualise(): void {
    setInterval(() => { }, 100, clearInterval(1500));
  }

  ngOnInit(): void {
    this.serviceAfficher.afficherCategorie().subscribe(data => {
      this.categorie = data;
    })
    this.createChart();

    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.menuBureau = false;
          this.menuMobile = true;
          this.actualise();
        } else {
          this.menuBureau = true;
          this.menuMobile = false;
          this.actualise();
        }
      });
    if (this.storage.connexionReussi()) {
      this.connexionReussi = true;
      this.roles = this.storage.recupererUser().roles;
    }
    this.currentUser = this.storage.recupererUser();
    var moi = this.currentUser.id;


    this.isLoggedIn = this.storage.connexionReussi();

    if (this.isLoggedIn) {
      const user = this.storage.recupererUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }

    // this.seoService.listuser().subscribe(data =>{
    //   this.listuser = data;
    //   console.log(data);
    // });

    this.serviceAfficher.afficheruser().subscribe(data => {
      // this.user = data.slice().reverse();
      this.listuser = data;
      console.log(data);
    });
    this.ajouteservice.listAnnoncuer().subscribe(data =>{
      this.ListeAnnonceur = data;
      console.log(data);
    });

    // this.ajouteservice.listeAnnonce()
    this.ajouteservice.afficherChallenge().subscribe(data => {
      this.challenge = data;
    });
    // statistique
    this.ajouteservice.afficherChallenge().subscribe(data => {
      // Trier les challenges par ID (du plus grand au plus petit)
      const sortedChallenges = data.sort((a: { idannonce: number; }, b: { idannonce: number; }) => b.idannonce - a.idannonce);

      // Récupérer le dernier challenge avec un état terminé
      this.challengeS = sortedChallenges.find((challengeS: { etat: string; }) => challengeS.etat === 'Terminé' || challengeS.etat === 'Encours');


      this.challengeS = sortedChallenges[11];
      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch13 = data.length

        })
      }

      this.challengeS = sortedChallenges[1];


      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch2 = data.length
        })
      }

      this.challengeS = sortedChallenges[2];


      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch3 = data.length
        })
      }
      this.challengeS = sortedChallenges[3];


      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch4 = data.length
        })
      }

      this.challengeS = sortedChallenges[4];


      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch5 = data.length
        })
      }

      this.challengeS = sortedChallenges[5];


      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch6 = data.length
        })

      }

      this.challengeS = sortedChallenges[6];


      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch7 = data.length
        })
      }

      this.challengeS = sortedChallenges[7];


      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch8 = data.length
        })
      }
      this.challengeS = sortedChallenges[8];
      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch9 = data.length
        })
      }
      this.challengeS = sortedChallenges[9];
      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch10 = data.length
        })
      }
      this.challengeS = sortedChallenges[10];
      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch11 = data.length
        })
      }
      this.challengeS = sortedChallenges[0];
      if (this.challengeS) {
        this.ch12 = this.challengeS.id
        this.serviceAfficher.solutions(this.ch12 = this.challengeS.id).subscribe(data => {
          this.ch1 = data.length

          this.serviceAfficher.afficheruser().subscribe(data => {
            this.afficheruser = data;

            this.janvier = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 1);
            this.fervrier = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 2);
            this.mars = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 3);
            this.avril = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 4);
            this.mai1 = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 5);
            this.juin = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 6);
            this.juillet = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 7);
            this.aout = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 8);
            this.septembre = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 9);
            this.octobre = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 10);
            this.novembre = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 11);
            this.decembre = this.afficheruser.filter((afficheruser: { mois: number; }) => afficheruser.mois === 12);
            this.jan = this.janvier.length; this.fe = this.fervrier.length; this.mar = this.mars.length;
            this.av = this.avril.length; this.mai = this.mai1.length; this.jui = this.juin.length;
            this.juil = this.juillet.length; this.au = this.aout.length; this.sep = this.septembre.length;
            this.oct = this.octobre.length; this.nov = this.novembre.length; this.dec = this.decembre.length;

            // this.createChart(); // Créez le chart ici, après avoir récupéré la valeur de fe.
          });
        })
      }


    });





    // fin

    this.serviceAfficher.afficherChallengeEncours().subscribe(data => {
      this.encours = data;
    });
    this.serviceAfficher.afficherChallengeTerminer().subscribe(data => {
      this.terminer = data;

    });
    this.serviceAfficher.afficherChallengeTerminer().subscribe(data => {
      this.avenir = data;

    });
  }
  title = 'DevsChallenge';
  afficheMenuMobile() {
    this.menuBureau = true;
    this.menuMobile = false;
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        datasets: [
          {
            label: "Utilisateur",
            data: [this.listuser, 7,5,9,10,5,4],
            backgroundColor: '#695CFE'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });

    this.actualise();
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(): void {
    this.connexion.logout().subscribe({
      next: res => {

        this.storage.clean();
        this.route.navigate(['/connexion']);
        // window.location.reload();
      },
      error: err => {

      }
    });
  }

}

