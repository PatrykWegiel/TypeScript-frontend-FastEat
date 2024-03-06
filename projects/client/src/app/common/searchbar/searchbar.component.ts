import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  @Input()
  placeHolder: string = ""

  @ViewChild('searchText') searchText: ElementRef | undefined;

  @Output()
  textFilterParam = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onSearch():void{
    let searchText = this.searchText?.nativeElement.value
     this.textFilterParam.emit(searchText)
  }
}
