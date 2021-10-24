import { Component, OnInit } from '@angular/core';
import { faPlusSquare, faFolderOpen, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  faPlusSquare = faPlusSquare;
  faFolderOpen = faFolderOpen;
  faPencilAlt = faPencilAlt;

  ngOnInit(): void {
  }

  onDocuments() {
    window.location.href="/documentos";
  }

}
