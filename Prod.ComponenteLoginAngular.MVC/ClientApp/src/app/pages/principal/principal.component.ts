import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import mixitup from 'mixitup';
declare var $: any;
import { DecisionComponent } from 'src/app/modals/decision/decision.component';
import { ModalResetearContrasenaComponent } from 'src/app/shared/modal/resetear-contrasena/resetear-contrasena.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  // styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  isAuth = false;
  opc = '';
  identificador = '';
  code = '';
  email = '';
  userName = '';
  constructor(elm: ElementRef,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    if (localStorage.getItem('AppVusp')) {
      this.isAuth = true;
    }
  }

  ngOnInit(): void {
    this.opc = (this.route.snapshot.queryParams.Opc);
    this.identificador = (this.route.snapshot.queryParams.Identificador);
    this.code = (this.route.snapshot.queryParams.Code);
    this.email = (this.route.snapshot.queryParams.Email);
    this.userName = (this.route.snapshot.queryParams.UserName);
    $(window).on('load', function () {
      $(".loader").fadeOut();
      $("#preloder").delay(200).fadeOut("slow");

      /*------------------
          Property filter
      --------------------*/
      $('.property-controls li').on('click', function () {
        $('.property-controls li').removeClass('active');
        $(this).addClass('active');
      });
      if ($('.property-filter').length > 0) {
        var containerEl = document.querySelector('.property-filter');
        var mixer = mixitup(containerEl);
      }

      /*------------------
      Background Set
  --------------------*/
      $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
      });

      //Canvas Menu
      $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
      });

      $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
      });

      /*------------------
          Navigation
      --------------------*/
      $(".nav-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
      });
    });
    var opc = document.getElementById('hdfOpc') as HTMLInputElement;
    if (opc) {
      var valor = opc.value;
      if (valor == "RC") {
        let config: MatDialogConfig = {
          panelClass: "dialog-responsive",
          width: "30%",
          data: {
            id: this.identificador,
            userName: this.userName,
            email: this.email
          },
          disableClose: true,
        }
        const dialogRef = this.dialog.open(ModalResetearContrasenaComponent, config);

        dialogRef.afterClosed().subscribe(result => {
          if (JSON.parse(result)) {
            console.log("Cerrado")
          }
        });
      }
    }
  }

  abrirmodal() {
    let config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      width: "30%",
      data: {
        message: ("¿Está seguro que desea guardar la información?")
      },
      disableClose: true,
    }
    const dialogRef = this.dialog.open(DecisionComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (JSON.parse(result)) {
        console.log("Cerrado")
      }
    });
  }
}
