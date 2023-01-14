import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-lesson',
  templateUrl: './modal-lesson.component.html',
  styleUrls: ['./modal-lesson.component.css']
})
export class ModalLessonComponent implements OnInit {
  selectValue: string = "Choisissez un type de leçon";
  selectVideo: string="Sélectionner le fournisseur du cours"
  constructor(public modalRef: MdbModalRef<ModalLessonComponent>) { 
    this.getSelectValue();
    this.getSelectVideo();
  }

  ngOnInit(): void {
  }

  getSelectValue() {
    if (this.selectValue == "video") {
      this.selectValue = "video";
      return this.selectValue;
    }
    if (this.selectValue == "fichier") {
      this.selectValue = "fichier";
      return this.selectValue;
    }
    return null;
  }

  getSelectVideo() {
    if (this.selectVideo == "youtube") {
      this.selectVideo = "youtube";
      return this.selectVideo;
    }
    if (this.selectVideo == "vimeo") {
      this.selectVideo = "vimeo";
      return this.selectVideo;
    }
    return null;
  }

}
