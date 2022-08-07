import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
  constructor(elm: ElementRef) {
    var ff = elm.nativeElement.getAttribute('tk');
    if (elm.nativeElement.getAttribute('tk') == 'true') {
      localStorage.setItem('AppVusp', elm.nativeElement.getAttribute('tk'));
      if (localStorage.getItem('redirect')) {
        var a = document.createElement('a');
        var url = JSON.parse(localStorage.getItem('redirect'));
        a.href = url;
        a.target = '_blank';
        document.body.append(a);
        a.click();
        document.body.removeChild(a);
        localStorage.removeItem('redirect');
      }
    }
    else {
      if(localStorage.getItem('AppVusp')){
        localStorage.removeItem('AppVusp');
      }
    }
  }
}
