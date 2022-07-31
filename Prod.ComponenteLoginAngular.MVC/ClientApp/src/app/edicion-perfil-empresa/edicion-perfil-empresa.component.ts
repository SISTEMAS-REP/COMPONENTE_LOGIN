import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edicion-perfil-empresa',
  templateUrl: './edicion-perfil-empresa.component.html',
  styleUrls: ['./edicion-perfil-empresa.component.css']
})
export class EdicionPerfilEmpresaComponent implements OnInit {
  isVisiblePerfil : boolean = true;
  isVisibleRepresentante : boolean = true;
  isVisibleContacto : boolean = true;

  isVisibleEditarContacto : boolean = false;
  isVisibleEditarRepresentante : boolean = false;
  isVisibleEditarImg : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  clickEditarRepresentante = () =>{ 
    this.isVisibleEditarRepresentante = true;
    this.isVisibleRepresentante = false;  
    this.isVisibleContacto = false; 
  }

  clickEditarContacto = () =>{ 
    this.isVisibleEditarContacto = true;
    this.isVisibleContacto = false; 
    this.isVisibleRepresentante = false;    
  }

  clickEditarImg= () =>{ 
    this.isVisibleEditarImg = true;
    this.isVisiblePerfil = false;  
    this.isVisibleEditarRepresentante = false; 
    this.isVisibleRepresentante = false; 
    this.isVisibleEditarContacto = false; 
    this.isVisibleContacto = false;  
  }

  clickCancelarContacto= () =>{ 
    this.isVisiblePerfil = true;  
    this.isVisibleContacto = true; 
    this.isVisibleEditarContacto = false;  
  }

  clickCancelarRepresentante= () =>{ 
    this.isVisiblePerfil = true;  
    this.isVisibleRepresentante = true; 
    this.isVisibleEditarRepresentante = false; 
  }

  clickCancelarImg= () =>{ 
    this.isVisiblePerfil = true;
    this.isVisibleRepresentante  = true;
    this.isVisibleContacto = true;
    this.isVisibleEditarContacto = false; 
    this.isVisibleEditarRepresentante = false; 
    this.isVisibleEditarImg = false; 

  }

}
