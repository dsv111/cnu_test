import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNocopy]',
})
export class NocopyDirective {
  constructor() {}

  // @HostListener('copy',['$event'])
  // onCopy(event:Event):void{
  //   event.preventDefault();
  //   alert('copying not allowed');
  // }

  @HostListener('paste', ['$event'])
  onPaste(event: Event): void {
    event.preventDefault();
    alert('paste not allowed');
  }
}
