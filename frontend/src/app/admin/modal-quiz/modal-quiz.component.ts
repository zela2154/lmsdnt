import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-quiz',
  templateUrl: './modal-quiz.component.html',
  styleUrls: ['./modal-quiz.component.css']
})
export class ModalQuizComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<ModalQuizComponent>) { }

  ngOnInit(): void {
  }

}
