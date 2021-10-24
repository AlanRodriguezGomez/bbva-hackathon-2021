import { Directive, HostBinding, HostListener, Output, Input, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {

  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();


  constructor() { }

  //Drag over listener
  @HostListener('dragover', ['$event']) onDragOver(evt:any){
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    console.log('Drag Over');
  }

  //Drag leave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();

    console.log('Drag Leave');
  }

  @HostListener('drop', ['$event']) public onDrop(evt:any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if(files.length > 0){
      this.fileDropped.emit(files);
      console.log(`You dropped ${files.length} files.`);
    }
  }

}
