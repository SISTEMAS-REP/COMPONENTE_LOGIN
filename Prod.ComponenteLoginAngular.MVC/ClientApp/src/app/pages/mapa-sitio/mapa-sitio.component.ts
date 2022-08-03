import { Component, OnInit } from '@angular/core';
import { FlatTreeControl} from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { enumerados } from 'src/app/enums/enumerados';
import { TupaService } from 'src/app/services/tupa.service';
import { PortalEnlaceService } from 'src/app/services/portalEnlace.service';
import { environment } from 'src/environments/environment';

interface FoodNode {
  name: string;
  url?: string;
  children?: FoodNode[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  url?: string;
  level: number;
}


@Component({
  selector: 'app-mapa-sitio',
  templateUrl: './mapa-sitio.component.html',
  // styleUrls: ['./mapa-sitio.component.css']
})
export class MapaSitioComponent implements OnInit {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      url: node.url,
      level: level,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  dataSourceOne = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  enumerado: enumerados = new enumerados();
  listaTupas: Array<any>;
  listaOpciones: Array<any>;
  _sector: number;
  _claseTupa: number;
  textoConsulta: string = '';
  page: number;
  pageSize: number;
  TREE_DATA: FoodNode[] = [
    {
      name: 'I. Trámites',
      children: [
          {name: 'Procedimiento TUPA',
          children: []
          },
          {name: 'Procedimiento No TUPA',
          children: []
          },
        ],
      //   {name: 'MYPE',
      //   children: [
      //     {name: 'Procedimiento TUPA',
      //     children: []
      //   },
      //     {name: 'Procedimiento No TUPA',
      //     children: []
      //   },
      //   ]
      // },
      //   {name: 'Otros',
      //   children: [
      //     {name: 'Procedimiento TUPA',
      //     children: []
      //   },
      //     {name: 'Procedimiento No TUPA',
      //     url: environment.apiPTD,
      //     children: []
      //   },
      //   ]
      // },
      // ]
    }, {
      name: 'II. Consultas en línea',
      children: [
        {
          name: 'Atención al ciudadano',
          children: []
        }, {
          name: 'Servicios',
          children: []
        },
      ]
    },
  ];
  TREE_DATA_ONE: FoodNode[] = [
    {
      name: 'III. Servicios Empresariales',
      children: []
    }, 
    {
      name: 'IV. Aplicaciones Móviles',
      children: [
        {
          name: 'Industria',
          children: []
        }, {
          name: 'Pesca',
          children: []
        },
      ]
    },
  ];

  constructor(
    private tupaService: TupaService,
    private portalEnlaceService: PortalEnlaceService
  ) { 

    this.dataSource.data = this.TREE_DATA;
    this.dataSourceOne.data = this.TREE_DATA_ONE;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    // this.fnTramitesTupaListar(this.enumerado.TIPO_SECTOR.PESCA, this.enumerado.CLASE_TUPA.PROCESOS);
    // this.fnTramitesTupaListar(this.enumerado.TIPO_SECTOR.PESCA, this.enumerado.CLASE_TUPA.SERVICIOS);
    // this.fnTramitesTupaListar(this.enumerado.TIPO_SECTOR.INDUSTRIA, this.enumerado.CLASE_TUPA.PROCESOS);
    // this.fnTramitesTupaListar(this.enumerado.TIPO_SECTOR.INDUSTRIA, this.enumerado.CLASE_TUPA.SERVICIOS);
    // this.fnTramitesTupaListar(this.enumerado.TIPO_SECTOR.OTROS, this.enumerado.CLASE_TUPA.PROCESOS);
    // this.fnTramitesTupaListar(this.enumerado.TIPO_SECTOR.OTROS, this.enumerado.CLASE_TUPA.SERVICIOS);
    this.fnTramitesTupaListar(0, this.enumerado.CLASE_TUPA.PROCESOS);
    this.fnTramitesTupaListar(0, this.enumerado.CLASE_TUPA.SERVICIOS);
    this.fnConsultasListarSeccion(this.enumerado.ENUMERADO.CONSULTA_EN_LINEA_ATENCION_AL_CIUDADANO);
    this.fnConsultasListarSeccion(this.enumerado.ENUMERADO.CONSULTA_EN_LINEA_SERVICIOS);
    this.fnConsultasOneListarSeccion(this.enumerado.ENUMERADO.SERVICIOS_EMPRESARIALES);
    this.fnConsultasOneListarSeccion(this.enumerado.ENUMERADO.APLICACIONES_MOVILES_PESCA);
    this.fnConsultasOneListarSeccion(this.enumerado.ENUMERADO.APLICACIONES_MOVILES_INDUSTRIA);

  }

  fnTramitesTupaListar = (sector, claseTupa) => {

    this.page = 1;
    this.pageSize = 250;
    this._sector = sector;
    this._claseTupa = claseTupa;
    this.listaTupas = [];

    this.tupaService.tupaListarPorClaseSector({
      IdClaseTupa: this._claseTupa,
      // IdSector: this._sector,
      IdSector: 0,
      Page: this.page,
      PageSize: this.pageSize,
      Query: this.textoConsulta
    })
      .then(resp => {
        this.listaTupas = resp.data;
        if (this.listaTupas.length > 0) {

          this.TREE_DATA.forEach(item =>  {
          if(item.name == "I. Trámites"){
            item.children.forEach(item1 =>  {
                  if(claseTupa == this.enumerado.CLASE_TUPA.PROCESOS){
                    if(item1.name == "Procedimiento TUPA"){
                      this.listaTupas.forEach(element => {
                        var url = "/interna-tramite?IdTupa="+element.idTupa
                         item1.children.push({name: element.descripcion, url: url});
                       });
                    }
                  }else{
                    if(item1.name == "Procedimiento No TUPA"){
                      this.listaTupas.forEach(element => {
                        var url = "/interna-tramite?IdTupa="+element.idTupa
                         item1.children.push({name: element.descripcion, url: url});
                       });
                    }
                  }
                // })
              // }
              // switch (sector){
              //   case 1:
              //     if(item1.name == "Pesca"){
              //       item1.children.forEach(item2 =>  {
              //         if(claseTupa == this.enumerado.CLASE_TUPA.PROCESOS){
              //           if(item2.name == "Procedimiento TUPA"){
              //             this.listaTupas.forEach(element => {
              //               var url = "/interna-tramite?IdTupa="+element.idTupa
              //                item2.children.push({name: element.descripcion, url: url});
              //              });
              //           }
              //         }else{
              //           if(item2.name == "Procedimiento No TUPA"){
              //             this.listaTupas.forEach(element => {
              //               var url = "/interna-tramite?IdTupa="+element.idTupa
              //                item2.children.push({name: element.descripcion, url: url});
              //              });
              //           }
              //         }
              //       })
              //     }
              //     break;
              //     case 2:
              //       if(item1.name == "MYPE"){
              //         item1.children.forEach(item2 =>  {
              //           if(claseTupa == this.enumerado.CLASE_TUPA.PROCESOS){
              //             if(item2.name == "Procedimiento TUPA"){
              //               this.listaTupas.forEach(element => {
              //                 var url = "/interna-tramite?IdTupa="+element.idTupa
              //                  item2.children.push({name: element.descripcion, url: url});
              //                });
              //             }
              //           }else{
              //             if(item2.name == "Procedimiento No TUPA"){
              //               this.listaTupas.forEach(element => {
              //                 var url = "/interna-tramite?IdTupa="+element.idTupa
              //                  item2.children.push({name: element.descripcion, url: url});
              //                });
              //             }
              //           }
              //         })
              //       }
              //       break;  
              //     case 3:
              //       if(item1.name == "Otros"){
              //         item1.children.forEach(item2 =>  {
              //           if(claseTupa == this.enumerado.CLASE_TUPA.PROCESOS){
              //             if(item2.name == "Procedimiento TUPA"){
              //               this.listaTupas.forEach(element => {
              //                 var url = "/interna-tramite?IdTupa="+element.idTupa
              //                  item2.children.push({name: element.descripcion, url: url});
              //                });
              //             }
              //           }else{
              //             if(item2.name == "Procedimiento No TUPA"){
              //               this.listaTupas.forEach(element => {
              //                 var url = environment.apiPTD;
              //                 item2.url = url;
              //                });
              //             }
              //           }
              //         })
              //       }
              //       break;  
              //     default:
              //       console.log("sin tramites");
              //       break;
              // }

            })
          }
        }); 
        this.dataSource.data = this.TREE_DATA;
        }
      })
      .catch(err => []);
  };

  fnConsultasListarSeccion = async (consulta) => {
    await this.portalEnlaceService
      .portalEnlaceListarPorSeccion({
        TipoSeccion: consulta
      })
      .then((resp) => {
        this.listaOpciones = resp.data;
        if (this.listaOpciones.length > 0) {
          this.TREE_DATA.forEach(item =>  {
          if(item.name == "II. Consultas en línea"){
            item.children.forEach(item1 =>  {
              switch (consulta){
                case  10002:
                  if(item1.name == "Atención al ciudadano"){
                    this.listaOpciones.forEach(element => {
                      var url = null;
                      if(element.esIframe){
                         url = "/consulta-atencion-ciudadano/"+ element.enlaceSeccion;
                      }else{
                        url = element.enlaceRuta;
                      }
                        item1.children.push({name: element.descripcion, url: url});
                      });
                  }
                  break;
                  case 10003:
                    if(item1.name == "Servicios"){
                      this.listaOpciones.forEach(element => {
                        var url = null;
                        if(element.esIframe){
                           url = "/consulta-servicios/"+ element.enlaceSeccion;
                        }else{
                          url = element.enlaceRuta;
                        }
                          item1.children.push({name: element.descripcion, url: url});
                        });
                    }
                    break;  
                  default:
                    console.log("sin tramites");
                    break;
              }

            })
          }
        }); 
        this.dataSource.data = this.TREE_DATA;
        }
      })
      .catch((err) => []);
  };

  fnConsultasOneListarSeccion = async (consulta) => {
    await this.portalEnlaceService
      .portalEnlaceListarPorSeccion({
        TipoSeccion: consulta
      })
      .then((resp) => {
        this.listaOpciones = resp.data;
        if (this.listaOpciones.length > 0) {
          this.TREE_DATA_ONE.forEach(item =>  {
              switch (consulta){
                case  10004:
                  if(item.name == "III. Servicios Empresariales"){
                    this.listaOpciones.forEach(element => {
                        item.children.push({name: element.nombre, url: element.enlaceRuta});
                      });
                  }
                  break;
                  case 10005:
                    if(item.name == "IV. Aplicaciones Móviles"){
                      item.children.forEach(item1 =>  {
                        if(item1.name == "Industria"){
                        this.listaOpciones.forEach(element => {
                            item1.children.push({name: element.nombre, url: element.enlaceRuta});
                          });
                        }
                      });
                    }
                    break;  
                    case 10006:
                      if(item.name == "IV. Aplicaciones Móviles"){
                        item.children.forEach(item1 =>  {
                          if(item1.name == "Pesca"){
                          this.listaOpciones.forEach(element => {
                              item1.children.push({name: element.nombre, url: element.enlaceRuta});
                            });
                          }
                        });
                      }
                      break;                      
                  default:
                    console.log("sin tramites");
                    break;
              }

        }); 
        this.dataSourceOne.data = this.TREE_DATA_ONE;
        }
      })
      .catch((err) => []);
  };

}
