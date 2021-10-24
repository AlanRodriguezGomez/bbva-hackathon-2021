import { Component, OnInit,  ViewChild, ElementRef  } from '@angular/core';
import { UploadService } from 'src/app/_services/upload.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { EventBusService } from '../../_shared/event-bus.service';
import { EventData } from '../../_shared/event.class';
import { SpinnerVisibilityService } from 'ng-http-loader';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  clicked: boolean = false;

  form:any = {
    titulo: null,
    descripcion: null
  };

  errorMessage = '';
  
  constructor(private uploadService: UploadService, private token: TokenStorageService, private eventBusService: EventBusService, private spinner: SpinnerVisibilityService) { 

  }

  ngOnInit(): void {
    if(this.token. getToken() == null){
      this.eventBusService.emit(new EventData('logout', null));
    }
  }

  /**
   * on file drop handler
   */
   onFileDropped($event:any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.clicked && this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        if(this.files.length > 0){
          this.clicked = false;
          console.log('user -> '+this.token.getUser().username);
    
          /*setTimeout(() => {
              this.spinner.hide();
          },3000);*/
          this.uploadService.uploadGo(this.files).subscribe(
            data => {
              console.log('data response',data);
              this.spinner.hide();
              window.location.href="/";
            },
            err => {
              console.log('error message',err.error);
              this.spinner.hide();
            }
          );
        }
        this.spinner.hide();
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            console.log('subiendo imagen....');
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  onSubmit(): void {
    this.clicked = true;
    this.spinner.show();
    this.uploadFilesSimulator(0);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

}
