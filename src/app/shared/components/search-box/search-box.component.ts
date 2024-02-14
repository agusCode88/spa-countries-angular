import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output() 
  public onValue: EventEmitter<string> = new EventEmitter<string>();
  
  @ViewChild('txtInput') 
  txtInput!: ElementRef<HTMLInputElement>;

  public emitValue(): void {
    this.placeholder = this.txtInput.nativeElement.value;
    this.onValue.emit(this.placeholder);
  }


  public onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.emitValue();
    }
  }
  
}
