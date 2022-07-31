import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edicion-perfil-persona',
  templateUrl: './edicion-perfil-persona.component.html',
  styleUrls: ['./edicion-perfil-persona.component.css']
})
export class EdicionPerfilPersonaComponent implements OnInit {
  isVisiblePerfil : boolean = true;
  isVisibleContacto : boolean = true;
  isVisibleEditarContacto : boolean = false;
  isVisibleEditarImg : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  clickEditarContacto = () =>{ 
    this.isVisibleEditarContacto = true;
    this.isVisibleContacto = false;   
  }

  clickEditarImg= () =>{ 
    this.isVisibleEditarImg = true;
    this.isVisiblePerfil = false;  
    this.isVisibleEditarContacto = false; 
    this.isVisibleContacto = false;  
  }

  clickCancelarContacto= () =>{ 
    this.isVisiblePerfil = true;  
    this.isVisibleContacto = true;  
    this.isVisibleEditarContacto = false; 
    this.isVisibleEditarImg = false;
  }

  clickCancelarImg= () =>{ 
    this.isVisiblePerfil = true;  
    this.isVisibleContacto = true;  
    this.isVisibleEditarContacto = false;
    this.isVisibleEditarImg = false; 

  }
}
