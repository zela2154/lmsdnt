import { Component, Input, OnInit } from '@angular/core';
import { ModalSectionComponent } from '../modal-section/modal-section.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalLessonComponent } from '../modal-lesson/modal-lesson.component';
import { ModalQuizComponent } from '../modal-quiz/modal-quiz.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  /*public tabHeaderText: object[] = [
     {text:"Basic"},
     {text:"Conditions"},
     {text:"Résultats"},
     {text:"Tarification"},
     {text:"Medias"},
     {text:"Finir"},
   ]*/
  toggleColor: number = 1;
   @Input() list: string[]=['Tout','carrot', 'banana', 'apple', 'potato',
     'tomato', 'cabbage', 'turnip', 'okra', 'onion', 'cherries', 'plum', 'mango'];
  inputItem = '';
  listHidden = true;
  showError = false;
  filteredList: string[] = [];
  selectedIndex = -1;

  @Input() list1: string[]=['Débutant','Intermédiare','Avancé'];
  inputItem1 = '';
  listHidden1 = true;
  showError1 = false;
  filteredList1: string[] = [];
  selectedIndex1 = -1;

  @Input() list2: string[]=['Français','Anglais','Espagnol','Wolof'];
  inputItem2 = '';
  listHidden2 = true;
  showError2 = false;
  filteredList2: string[] = [];
  selectedIndex2 = -1;
  isFree: boolean = false;
  isDiscounted: boolean = false;
  price: number=0;
  minusPrice: number=0;
  reduction: number = 0;

  isEditCours: boolean;
  
   modalRef: MdbModalRef<ModalSectionComponent> | null = null;
  constructor(private modalService: MdbModalService,
    private route: ActivatedRoute,
    private router: Router) { }

  openModal() {
    this.modalRef = this.modalService.open(ModalSectionComponent)
  }
  openModal1() {
    this.modalRef = this.modalService.open(ModalLessonComponent)
  }
   openModal2() {
    this.modalRef = this.modalService.open(ModalQuizComponent)
  }

  ngOnInit(): void {
    //this.pReduction();
    let id: string|null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditCours = this.router.url.includes('course-edit/' + id);
      this.toggleColor = 0;
    }
  }

  toggleBackground(id: number) {
    this.toggleColor = id;
  }

  prev() {
    let id: string | null = this.route.snapshot.paramMap.get('id');
    if (this.isEditCours = this.router.url.includes('course-edit/' + id)) {
      this.toggleColor = 0;
      if (this.toggleColor <= 0) {
      this.toggleColor = 0;
      }
    }
     if (this.toggleColor <= 1) {
      this.toggleColor = 1;
    } else {
      this.toggleColor--;
   }
  }

  next() {
    if (this.toggleColor >=6) {
      this.toggleColor = 6;
    } else {
      this.toggleColor++;
   }
  }

  getFilteredList() {
       // this.listHidden = false;
        if (!this.listHidden && this.inputItem !== undefined) {
            this.filteredList = this.list.filter((item) =>  item.toLowerCase().startsWith(this.inputItem.toLowerCase()));
    }
  }
  
  // select highlighted item when enter is pressed or any item that is clicked
    selectItem(ind: number) {
        this.inputItem = this.filteredList[ind];
        this.listHidden = true;
        this.selectedIndex = ind;
    }
  
  // navigate through the list of items
    onKeyPress(event: { key: string; }) {
        if (!this.listHidden) {
            if (event.key === 'Escape') {
                this.selectedIndex = -1;
                this.toggleListDisplay(0);
            }else if (event.key === 'Enter') {
                this.toggleListDisplay(0);
            }else if (event.key === 'ArrowDown') {
                this.listHidden = false;
                this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
                if (this.filteredList.length > 0 && !this.listHidden) {
                    document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
                }
            } else if (event.key === 'ArrowUp') {
                this.listHidden = false;
                if (this.selectedIndex <= 0) {
                    this.selectedIndex = this.filteredList.length;
                }
                this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;
                if (this.filteredList.length > 0 && !this.listHidden) {
                document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
                }
            }
        }
    }
  
  // show or hide the dropdown list when input is focused or moves out of focus
    toggleListDisplay(sender: number) {
        if (sender === 1) {
            this.listHidden = false;
            this.getFilteredList();
        } else {
            // helps to select item by clicking
            setTimeout(() => {
                this.selectItem(this.selectedIndex);
                this.listHidden = true;
                if (!this.list.includes(this.inputItem)) {
                    this.showError = true;
                    this.filteredList = this.list;
                } else {
                    this.showError = false;
                }
            }, 500);
        }
    }




    getFilteredList1() {
       // this.listHidden = false;
        if (!this.listHidden1 && this.inputItem1 !== undefined) {
            this.filteredList1 = this.list1.filter((item) =>  item.toLowerCase().startsWith(this.inputItem1.toLowerCase()));
    }
  }
  
  // select highlighted item when enter is pressed or any item that is clicked
    selectItem1(ind: number) {
        this.inputItem1 = this.filteredList1[ind];
        this.listHidden1 = true;
        this.selectedIndex1 = ind;
    }
  
  // navigate through the list of items
    onKeyPress1(event: { key: string; }) {
        if (!this.listHidden1) {
            if (event.key === 'Escape') {
                this.selectedIndex1 = -1;
                this.toggleListDisplay1(0);
            }else if (event.key === 'Enter') {
                this.toggleListDisplay1(0);
            }else if (event.key === 'ArrowDown') {
                this.listHidden1 = false;
                this.selectedIndex1 = (this.selectedIndex1 + 1) % this.filteredList1.length;
                if (this.filteredList1.length > 0 && !this.listHidden) {
                    document.getElementsByTagName('list-item')[this.selectedIndex1].scrollIntoView();
                }
            } else if (event.key === 'ArrowUp') {
                this.listHidden1 = false;
                if (this.selectedIndex1 <= 0) {
                    this.selectedIndex1 = this.filteredList1.length;
                }
                this.selectedIndex1 = (this.selectedIndex1 - 1) % this.filteredList1.length;
                if (this.filteredList1.length > 0 && !this.listHidden1) {
                document.getElementsByTagName('list-item')[this.selectedIndex1].scrollIntoView();
                }
            }
        }
    }
  
  // show or hide the dropdown list when input is focused or moves out of focus
    toggleListDisplay1(sender: number) {
        if (sender === 1) {
            this.listHidden1 = false;
            this.getFilteredList1();
        } else {
            // helps to select item by clicking
            setTimeout(() => {
                this.selectItem1(this.selectedIndex1);
                this.listHidden1 = true;
                if (!this.list1.includes(this.inputItem1)) {
                    this.showError1 = true;
                    this.filteredList1 = this.list1;
                } else {
                    this.showError1 = false;
                }
            }, 500);
        }
    }




  getFilteredList2() {
       // this.listHidden = false;
        if (!this.listHidden2 && this.inputItem2 !== undefined) {
            this.filteredList2 = this.list2.filter((item) =>  item.toLowerCase().startsWith(this.inputItem2.toLowerCase()));
    }
  }
  
  // select highlighted item when enter is pressed or any item that is clicked
    selectItem2(ind: number) {
        this.inputItem2 = this.filteredList2[ind];
        this.listHidden2 = true;
        this.selectedIndex2 = ind;
    }
  
  // navigate through the list of items
    onKeyPress2(event: { key: string; }) {
        if (!this.listHidden2) {
            if (event.key === 'Escape') {
                this.selectedIndex2 = -1;
                this.toggleListDisplay2(0);
            }else if (event.key === 'Enter') {
                this.toggleListDisplay2(0);
            }else if (event.key === 'ArrowDown') {
                this.listHidden2 = false;
                this.selectedIndex2 = (this.selectedIndex2 + 1) % this.filteredList2.length;
                if (this.filteredList2.length > 0 && !this.listHidden2) {
                    document.getElementsByTagName('list-item')[this.selectedIndex2].scrollIntoView();
                }
            } else if (event.key === 'ArrowUp') {
                this.listHidden2 = false;
                if (this.selectedIndex2 <= 0) {
                    this.selectedIndex2 = this.filteredList2.length;
                }
                this.selectedIndex2 = (this.selectedIndex2 - 1) % this.filteredList2.length;
                if (this.filteredList2.length > 0 && !this.listHidden2) {
                document.getElementsByTagName('list-item')[this.selectedIndex2].scrollIntoView();
                }
            }
        }
    }
  
  // show or hide the dropdown list when input is focused or moves out of focus
    toggleListDisplay2(sender: number) {
        if (sender === 1) {
            this.listHidden2 = false;
            this.getFilteredList2();
        } else {
            // helps to select item by clicking
            setTimeout(() => {
                this.selectItem(this.selectedIndex2);
                this.listHidden2 = true;
                if (!this.list2.includes(this.inputItem2)) {
                    this.showError2 = true;
                    this.filteredList2 = this.list2;
                } else {
                    this.showError2 = false;
                }
            }, 500);
        }
    }


  addInputElement() {
    let ul = document.getElementById('ulrequirement');
    let li = document.createElement('li');
    li.id = "lirequirement";
    li.style.display = "flex";
    li.style.width = "50%";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.marginTop = "20px";
    let lirequirement = document.createElement('input');
    lirequirement.id="requirements"
    lirequirement.name = "requirements[]";
    lirequirement.type = "text";
    lirequirement.style.width = "80%";
    lirequirement.style.height = "40px";
    lirequirement.classList.add("inputid");
    let button = document.createElement('button');
    button.style.padding= "0.28rem 0.8rem";
    button.style.fontSize= "0.875rem";
    button.style.borderRadius= "0.15rem";
    button.style.color="#fff";
    button.style.backgroundColor="#fa5c7c";
    button.style.borderColor = "#fa5c7c";
    button.style.height = "40px";
    let i = document.createElement('i');
    i.className = "mdi mdi-minus";
    i.style.fontSize = "18px";
    button.appendChild(i);

    ul?.appendChild(li);
    li.appendChild(lirequirement);
    li.appendChild(button);
    button.onclick = function () {
      li.parentNode?.removeChild(li);
    };
    }

  


  addInputElementResult() {
    let ul = document.getElementById('ulresult');
    let li = document.createElement('li');
    li.id = "lirequirement";
    li.style.display = "flex";
    li.style.width = "50%";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.marginTop = "20px";
    let lirequirement = document.createElement('input');
    lirequirement.id="requirements"
    lirequirement.name = "requirements[]";
    lirequirement.type = "text";
    lirequirement.style.width = "80%";
    lirequirement.style.height = "40px";
    lirequirement.classList.add("inputid");
    let button = document.createElement('button');
    button.style.padding= "0.28rem 0.8rem";
    button.style.fontSize= "0.875rem";
    button.style.borderRadius= "0.15rem";
    button.style.color="#fff";
    button.style.backgroundColor="#fa5c7c";
    button.style.borderColor = "#fa5c7c";
    button.style.height = "40px";
    let i = document.createElement('i');
    i.className = "mdi mdi-minus";
    i.style.fontSize = "18px";
    button.appendChild(i);

    ul?.appendChild(li);
    li.appendChild(lirequirement);
    li.appendChild(button);
    button.onclick = function () {
      li.parentNode?.removeChild(li);
    };
    }


  pReduction() {
    if (this.reduction === undefined || this.price===null) {
      this.reduction = 0;
      return this.reduction;
    } else {
      this.reduction = ((this.price - this.minusPrice) / this.price) * 100;
      return this.reduction;
    }
  }

  gotoCourses() {
    this.router.navigate(['lms-dnt/admin/courses'])
  }

}
