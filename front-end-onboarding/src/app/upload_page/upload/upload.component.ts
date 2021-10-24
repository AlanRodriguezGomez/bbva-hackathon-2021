import { Component, OnInit, ViewChild, TemplateRef, AbstractType } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { UploadService } from 'src/app/_services/upload.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { EventBusService } from '../../_shared/event-bus.service';
import { EventData } from '../../_shared/event.class';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MyBootstrapModalComponent } from 'src/app/modals/my-bootstrap-modal/my-bootstrap-modal.component';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  form: any = {
    cert: null,
    rut: null,
    cedula: null,
    firma: null,
  };

  closeModal: string;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  faCheck = faCheck;

  files: any[] = [];
  
  modalRef: any;

  constructor(private uploadService: UploadService, private token: TokenStorageService,private spinner: SpinnerVisibilityService, private eventBusService: EventBusService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.token.getToken() == null){
      this.eventBusService.emit(new EventData('logout', null));
    }
  }

  triggerModal() {
    this.modalService.open(MyBootstrapModalComponent).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      window.location.href="/dashboard/complete";
    });
  }

  openModal(template: any) {
    this.modalService.open(template);
   }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  /**
   * handle file from browsing
   */
   fileBrowseHandler(files: any) {
    this.prepareFilesList(files);
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
  }


  onSubmit(): void {
  
    this.spinner.show();

    console.log('files',this.files);
    console.log('email', this.token.getUser().email);

    this.uploadService.uploadGo(this.token.getUser().email,this.files).subscribe(
      data => {
        console.log('data response',data);
        this.spinner.hide();
        this.triggerModal();
      },
      err => {
        console.log('error message',err.error);
        this.spinner.hide();
      }
    );


  }

  onDashboard() {
    window.location.href="/dashboard";
  }

}
