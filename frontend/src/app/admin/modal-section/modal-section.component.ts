import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-section',
  templateUrl: './modal-section.component.html',
  styleUrls: ['./modal-section.component.css']
})
export class ModalSectionComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<ModalSectionComponent>) { }

  ngOnInit(): void {
  }

}
