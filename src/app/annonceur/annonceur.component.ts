import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AfficherService } from '../Services/afficher.service';
import { AjoutServiceService } from '../Services/ajout-service.service';
import { AjouterServiceService } from '../Services/ajouter-service.service';
import { StorageService } from '../Services/storage.service';

@Component({
  selector: 'app-annonceur',
  templateUrl: './annonceur.component.html',
  styleUrls: ['./annonceur.component.css'],
  providers: [DatePipe]
})
export class AnnonceurComponent {
//Declaration Des VARIABLES POUR L'AJOUT ANNONCE
titreannonce : string="";
descriptionannonce : string= "";
prixannonce : string="";
dateDebut: any;
image: string="";
idannonceur: number= 0;
id:number=0;
dateFin: any;
idannonce: number=0;
// ciblediffusionannonce: string = "";
ListeAnnonceur:any;
ListeSite: any;

term: any;
p: any;
errorMessage: string = "";
menuBureau: boolean = true;
menuMobile: boolean = false;
challengeForm!: FormGroup;
critereForm!: FormGroup;
cateForm!: FormGroup;
technoForm!: FormGroup;
baremeForm!: FormGroup;
challengeFormModifier!: FormGroup;
titre: any;
description: any;
datefin: any;
status: any;
today!: Date;
encours: any;
terminer: any;

options = [];
options1 = [];
options2 = [];
options4 = [];

catetec = {
  singleSelection: false,
  idField: 'id',
  textField: 'nom',
  selectAllText: 'Tout',
  unSelectAllText: 'Tout',
  noDataAvailablePlaceholderText: 'No data available',
  allowSearchFilter: true,
  closeDropDownOnSelection: true,
  itemsShowLimit: 3,
};
critere = {
  singleSelection: false,
  idField: 'id',
  textField: 'critere',
  selectAllText: 'Tout',
  unSelectAllText: 'Tout',
  allowSearchFilter: true,
  closeDropDownOnSelection: true,
  itemsShowLimit: 1,
};
disabled = false;
ShowFilter = false;
limitSelection = false;
bareme = {
  singleSelection: true, // <-- modification
  defaultOpen: false,
  idField: 'id',
  textField: 'bareme',
  selectAllText: 'Tout',
  unSelectAllText: 'Tout',
  closeDropDownOnSelection: true,
  allowSearchFilter: this.ShowFilter
};
responseMessage: string = "";
challenge: any;
critereParIdChallenge: any;
ParIdChallenge: any;
idChallenge!: number;
avenir: any;
isCollapsed = true;
crite: any;

// ListeAnnonceur:any;
// ListeSite: any;
ListeAnnonce: any
  ListeannoncebyId: any;
  listuser: any;
// id:number=0;





constructor(
  private ajouteservice : AjoutServiceService,
  public breakpointObserver: BreakpointObserver,
  private route: Router, private routes: ActivatedRoute, private serviceAfficher: AfficherService,
  private serviceAjouter: AjouterServiceService, private datePipe: DatePipe,
  private storageService:StorageService) { }

actualise(): void {

  setInterval(
    () => {
    }, 100, clearInterval(1500));
}
ngOnInit(): void {
  this.today = new Date();
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
     //Recuperation de l'annonce
   this.Annonces();

   //REcuperation de l'annonceur
     this.Annonceurs();
     // this.doRefresh();
     this.siteliste();

    this.ajouteservice.listAnnoncuer().subscribe(data =>{
      this.ListeAnnonceur = data;
      console.log(data);
    });
    this.ajouteservice.listeAnnonceById(this.idannonce).subscribe(data =>{
      console.log("objet trouvee========", this.idannonce);
      this.ListeannoncebyId = data;
    })
    this.serviceAfficher.afficheruser().subscribe(data => {
      // this.user = data.slice().reverse();
      this.listuser = data;
      console.log(data);
    });
    
    this.ajouteservice.listSite().subscribe(data =>{
      this.ListeSite = data;
      console.log(data);
    })

  this.challengeForm = new FormGroup({
    titreannonce: new FormControl(''),
    descriptionannonce: new FormControl(''),
    dateDebut: new FormControl(''),
    dateFin: new FormControl(''),
    // critereids: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
    // tecnhoids: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
    // cateids: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
    image: new FormControl(''),
    fileSource: new FormControl('', [Validators.required])
  });
  this.challengeFormModifier = new FormGroup({
    titreannonce: new FormControl(''),
    descriptionannonce: new FormControl(''),
    dateDebut: new FormControl(''),
    dateFin: new FormControl(''),
    // critereids: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
    // tecnhoids: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
    // cateids: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),
    image: new FormControl(''),
    fileSource: new FormControl('', [Validators.required])
  });
  this.critereForm = new FormGroup({
    criteres: new FormControl(''),
    baremeids: new FormControl([Validators.required, Validators.pattern("^[0-9]*$")]),

  })
  this.serviceAfficher.afficherChallengeAvenir().subscribe(data=>{
    this.avenir=data;
  })
  this.cateForm = new FormGroup({
    cate: new FormControl(''),
  })
  this.baremeForm = new FormGroup({
    bareme: new FormControl(''),
  })
  this.technoForm = new FormGroup({
    techno: new FormControl(''),
  })
  this.serviceAfficher.afficherChallenge().subscribe(data => {
    this.challenge = data;
  });
  this.serviceAfficher.afficherChallengeEncours().subscribe(data => {
    this.encours = data;
  });
  this.serviceAfficher.afficherChallengeTerminer().subscribe(data => {
    this.terminer = data;

  });

  this.idChallenge = this.routes.snapshot.params['idChallenge']


  this.serviceAfficher.afficherCategorie().subscribe(data => {
    this.options = data;
  });
  this.serviceAfficher.afficherCategorie().subscribe(data => {
    this.options = data;
  });
  this.serviceAfficher.afficherTecnho().subscribe(data => {
    this.options1 = data;
  })
  this.serviceAfficher.afficherCritere().subscribe(data => {
    this.options2 = data;
  })
  this.serviceAfficher.afficherBareme().subscribe(data => {
    this.options4 = data;
  })
}

siteliste(){
  this.ajouteservice.listSite().subscribe(data =>{
    this.ListeSite = data;
    console.log(data);
  })
}

Annonceurs(){
  this.ajouteservice.listAnnoncuer().subscribe(data =>{
    this.ListeAnnonceur = data;
    console.log(data);
  })
}
// recupereImag(event:any){
//   console.log(event.target.value)
//   this.id=event.target.value
//   console.log(this.ListeSite)
//  }

Annonces(){
  this.ajouteservice.listeAnnonce().subscribe(data => {
    this.ListeAnnonce = data;
    console.log(data);
  });
}

get fphoto() {
  return this.challengeForm.controls;
}


onFileChangePhoto(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.challengeForm.patchValue({
      fileSource: file
    });
  }
}
onFileChangePhotoMod(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.challengeFormModifier.patchValue({
      fileSourcemod: file
    });
  }
}

onSubmit() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: '',
      cancelButton: ''
    },
    heightAuto: false

  })
  if (this.challengeForm.valid) {
    const formData = new FormData();
    const cateids = this.challengeForm.value.cateids.map((options: { id: any; }) => options.id);
    const tecnhoids = this.challengeForm.value.tecnhoids.map((options2: { id: any; }) => options2.id);
    const critereids = this.challengeForm.value.critereids.map((options1: { id: any; }) => options1.id);
    this.challengeForm.value.dateDebut = this.datePipe.transform(this.challengeForm.value.dateDebut, 'yyyy/MM/dd');
    this.challengeForm.value.dateFin = this.datePipe.transform(this.challengeForm.value.dateFin, 'yyyy/MM/dd');

    formData.append('critereids', critereids);
    formData.append('tecnhoids', tecnhoids);
    formData.append('cateids', cateids);
    formData.append('titreannonce', this.challengeForm.value.titreannonce);
    formData.append('descriptionannonce', this.challengeForm.value.descriptionannonce);
    formData.append('dateDebut', this.challengeForm.value.dateDebut);
    formData.append('dateFin', this.challengeForm.value.dateFin);
    formData.append('image', this.challengeForm.value.fileSource);


    swalWithBootstrapButtons.fire({
      title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Cet challenge va être ajouté !!?</h1>",
      showCancelButton: true,
      confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
      cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.serviceAjouter.AjouterChallenge(formData).subscribe((data: any) => {
            this.errorMessage = data.message;
            this.status = data.status;

            if (this.status == true) {
              swalWithBootstrapButtons.fire(
                `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
              )
              this.challengeForm.reset()
            } else if (this.status == false) {
              swalWithBootstrapButtons.fire(
                `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
              )
            }
          });

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '',
            "<h1 style='font-size:.9em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Opération annulée</h1>",
            'error'
          )
        }
      })


  } else {
    swalWithBootstrapButtons.fire(
      `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Tous les champs champs sont obligatoirs !!</h1>`,
    )

  }
}
onSubmitModifier() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: '',
      cancelButton: ''
    },
    heightAuto: false

  })

  const formData = new FormData();
  const cateids = this.challengeForm.value.cateids.map((options: { id: any; }) => options.id);
  const tecnhoids = this.challengeForm.value.tecnhoids.map((options2: { id: any; }) => options2.id);
  const critereids = this.challengeForm.value.critereids.map((options1: { id: any; }) => options1.id);
  this.challengeForm.value.dateDebut = this.datePipe.transform(this.challengeForm.value.dateDebut, 'yyyy/MM/dd');
  this.challengeForm.value.dateFin = this.datePipe.transform(this.challengeForm.value.dateFin, 'yyyy/MM/dd');

  formData.append('critereids', critereids);
  formData.append('tecnhoids', tecnhoids);
  formData.append('cateids', cateids);
  formData.append('titreannonce', this.challengeForm.value.titreannonce);
  formData.append('descriptionannonce', this.challengeForm.value.descriptionannonce);
  formData.append('dateDebut', this.challengeForm.value.dateDebut);
  formData.append('dateFin', this.challengeForm.value.dateFin);
  formData.append('image', this.challengeForm.value.fileSource);

    swalWithBootstrapButtons.fire({
      title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Cet challenge va être ajouté !!?</h1>",
      showCancelButton: true,
      confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
      cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
    })
      .then((result) => {
        if (result.isConfirmed) {
          
          this.serviceAjouter.modifierChallenge(this.storageService.getModId().id, formData).subscribe((data: any) => {
            this.errorMessage = data.message;
            this.status = data.status;

            if (this.status == true) {
              swalWithBootstrapButtons.fire(
                `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,

              )
              this.challengeFormModifier.reset();

            } else if (this.status == false) {
              swalWithBootstrapButtons.fire(
                `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
              )
            }
          });

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '',
            "<h1 style='font-size:.9em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Opération annulée</h1>",
            'error'
          )
        }
      })
  
}
onSubmitCritere() {
  if (this.critereForm.valid) {
    const formData = new FormData();
    const baremeids = this.critereForm.value.baremeids.map((options4: { id: any; }) => options4.id);
   
    formData.append('baremeids', baremeids);
    formData.append('criteres', this.critereForm.value.criteres);

    this.serviceAjouter.AjouterCritere(formData).subscribe((data: any) => {
      this.errorMessage = data.message;
      this.status = data.status;
      this.critereForm.reset();
    });
  } else {
    this.errorMessage = "Tous les champs champs sont obligatoirs !!";

  }
}

onSubmitBareme() {
  if (this.baremeForm.valid) {
    const formData = new FormData();
    formData.append('bareme', this.baremeForm.value.bareme);
    this.serviceAjouter.AjouterBareme(formData).subscribe((data: any) => {
      this.errorMessage = data.message;
      this.status = data.status;
      this.baremeForm.reset();
    });
  } else {
    this.errorMessage = "Tous les champs champs sont obligatoirs !!";

  }
}
onSubmitCate() {
  if (this.cateForm.valid) {
    const formData = new FormData();
    formData.append('cate', this.cateForm.value.cate);

    this.serviceAjouter.AjouterCate(formData).subscribe((data: any) => {
      this.errorMessage = data.message;
      this.status = data.status;
      this.cateForm.reset();
    });
  } else {
    this.errorMessage = "Tous les champs champs sont obligatoirs !!";

  }
}
onSubmitTechno() {
  if (this.technoForm.valid) {
    const formData = new FormData();
    formData.append('techno', this.technoForm.value.techno);
    this.serviceAjouter.AjouterTechno(formData).subscribe((data: any) => {
      this.errorMessage = data.message;
      this.status = data.status;
      this.technoForm.reset();
    });
  } else {
    this.errorMessage = "Tous les champs champs sont obligatoirs !!";

  }
}
afficheMenuMobile() {
  this.menuBureau = true;
  this.menuMobile = false;
}

affichage(idChallenge: any) {
  this.serviceAfficher.afficherCritereParIdChallenge(idChallenge).subscribe(data => {
    this.critereParIdChallenge = data;
  })

  
  this.serviceAfficher.afficherParIdChallenge(idChallenge).subscribe(data => {
    this.ParIdChallenge = data;
    this.titre = data.titre;
    this.description = data.description;
    this.datefin = data.datefin;
    this.crite = data.critere.nom
  })
}

affichage3(idChallenge: any) {
  
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: '',
      cancelButton: ''
    },
    heightAuto: false

  })
    swalWithBootstrapButtons.fire({
      title: "<h1 style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Cet challenge va être ajouté !!?</h1>",
      showCancelButton: true,
      confirmButtonText: '<span style="font-size:.9em">Confirmer</span>',
      cancelButtonText: `<span style="font-size:.9em"> Annuler</span>`,
    })
      .then((result) => {
        if (result.isConfirmed) {
          
          this.serviceAjouter.supprimer(idChallenge).subscribe((data: any) => {
            this.errorMessage = data.message;
            this.status = data.status;

            if (this.status == true) {
              swalWithBootstrapButtons.fire(
                `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
              )

            } else if (this.status == false) {
              swalWithBootstrapButtons.fire(
                `<h1  style='font-size:.7em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>${this.errorMessage}.</h1>`,
              )
            }
          });

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '',
            "<h1 style='font-size:.9em; font-weight: bold;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;'>Opération annulée</h1>",
            'error'
          )
        }
      })
}

isChallengeInProgress(startDate: string): boolean {
  const challengeStartDate = new Date(startDate.split('T')[0]);
  const currentDate = new Date();
  return challengeStartDate > currentDate;
}
affichage2(id:number){
  const modId = {
    "id":id
  }
  this.storageService.modId(modId);
 }

reset() {
  this.challengeForm.reset();
}

resetC() {
  this.critereForm.reset();
}
//METHODE PERMETTANT DE RECUPERER L IMAGE DE LA REGION
recupereImage(event:any){
  this.image = event.target["files"][0];
  console.log(this.image)
}
recupereImag(event:any){
 console.log(event.target.value)
 this.id=event.target.value
 console.log(this.ListeSite)
}

}

