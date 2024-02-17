import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls:['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit,AfterViewInit, OnDestroy {

  //Tipo especial de Observable
  private debouncer: Subject<string> = new Subject<string>
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input() 
  public initialValue: string = '';

  @Output() 
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output() 
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('txtInput') 
  public txtInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
   
  this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe( value => {
        this.onDebounce.emit(value);
      })  
  }

  ngAfterViewInit(): void {
    this.txtInput.nativeElement.value = this.initialValue;
    console.log(this.initialValue);
  }

  emitValue(value: string): void {
    this.onValue.emit( value );
  }

  onKeyPress(): void {
    const searchTerm: string = this.txtInput.nativeElement.value;
    this.debouncer.next( searchTerm ) ;
   // this.emitValue(searchTerm);
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
 }

 
}
