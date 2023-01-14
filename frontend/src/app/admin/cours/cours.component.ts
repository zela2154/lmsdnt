import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  @Input() list: string[]=['Tout','carrot', 'banana', 'apple', 'potato',
    'tomato', 'cabbage', 'turnip', 'okra', 'onion', 'cherries', 'plum', 'mango'];
  @Input() list1: string[]=['Tout','Actif', 'En attente'];
  @Input() list2: string[]=['Tout','carrot', 'banana', 'apple', 'potato',
    'tomato', 'cabbage', 'turnip', 'okra', 'onion', 'cherries', 'plum', 'mango'];
  @Input() list3: string[]=['Tout','Payant', 'Gratuit'];
    // two way binding for input text
    inputItem = '';
    inputItem1 = '';
    inputItem2 = '';
    inputItem3 = '';
    // enable or disable visiblility of dropdown
    listHidden = true;
    listHidden1 = true;
    listHidden2 = true;
    listHidden3 = true;
    showError = false;
    showError1 = false;
    showError2 = false;
    showError3 = false;
    selectedIndex = -1;
    selectedIndex1 = -1;
    selectedIndex2 = -1;
    selectedIndex3 = -1;
    // the list to be shown after filtering
  filteredList: string[] = [];
  filteredList1: string[] = [];
  filteredList2: string[] = [];
  filteredList3: string[] = [];
  
    // modifies the filtered list as per input
    getFilteredList() {
       // this.listHidden = false;
        if (!this.listHidden && this.inputItem !== undefined) {
            this.filteredList = this.list.filter((item) =>  item.toLowerCase().startsWith(this.inputItem.toLowerCase()));
    }
    }
  getFilteredList1() {
       // this.listHidden = false;
        if (!this.listHidden1 && this.inputItem1 !== undefined) {
            this.filteredList1 = this.list1.filter((item) =>  item.toLowerCase().startsWith(this.inputItem1.toLowerCase()));
    }
  }
  getFilteredList2() {
       // this.listHidden = false;
        if (!this.listHidden2 && this.inputItem2 !== undefined) {
            this.filteredList2 = this.list2.filter((item) =>  item.toLowerCase().startsWith(this.inputItem2.toLowerCase()));
    }
  }
  getFilteredList3() {
       // this.listHidden = false;
        if (!this.listHidden3 && this.inputItem3 !== undefined) {
            this.filteredList3 = this.list3.filter((item) =>  item.toLowerCase().startsWith(this.inputItem3.toLowerCase()));
    }
}
    // select highlighted item when enter is pressed or any item that is clicked
    selectItem(ind: number) {
        this.inputItem = this.filteredList[ind];
        this.listHidden = true;
        this.selectedIndex = ind;
    }
  selectItem1(ind: number) {
        this.inputItem1 = this.filteredList1[ind];
        this.listHidden1 = true;
        this.selectedIndex1 = ind;
  }
  selectItem2(ind: number) {
        this.inputItem2 = this.filteredList2[ind];
        this.listHidden2 = true;
        this.selectedIndex2 = ind;
  }
  selectItem3(ind: number) {
        this.inputItem3 = this.filteredList3[ind];
        this.listHidden3 = true;
        this.selectedIndex3 = ind;
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
                if (this.filteredList1.length > 0 && !this.listHidden1) {
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
  onKeyPress3(event: { key: string; }) {
        if (!this.listHidden3) {
            if (event.key === 'Escape') {
                this.selectedIndex3 = -1;
                this.toggleListDisplay3(0);
            }else if (event.key === 'Enter') {
                this.toggleListDisplay3(0);
            }else if (event.key === 'ArrowDown') {
                this.listHidden3 = false;
                this.selectedIndex3 = (this.selectedIndex3 + 1) % this.filteredList3.length;
                if (this.filteredList3.length > 0 && !this.listHidden3) {
                    document.getElementsByTagName('list-item')[this.selectedIndex3].scrollIntoView();
                }
            } else if (event.key === 'ArrowUp') {
                this.listHidden3 = false;
                if (this.selectedIndex3 <= 0) {
                    this.selectedIndex3 = this.filteredList3.length;
                }
                this.selectedIndex3 = (this.selectedIndex3 - 1) % this.filteredList3.length;
                if (this.filteredList3.length > 0 && !this.listHidden3) {
                document.getElementsByTagName('list-item')[this.selectedIndex3].scrollIntoView();
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
  toggleListDisplay2(sender: number) {
        if (sender === 1) {
            this.listHidden2 = false;
            this.getFilteredList2();
        } else {
            // helps to select item by clicking
            setTimeout(() => {
                this.selectItem2(this.selectedIndex2);
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
  toggleListDisplay3(sender: number) {
        if (sender === 1) {
            this.listHidden3 = false;
            this.getFilteredList3();
        } else {
            // helps to select item by clicking
            setTimeout(() => {
                this.selectItem3(this.selectedIndex3);
                this.listHidden3 = true;
                if (!this.list3.includes(this.inputItem3)) {
                    this.showError3 = true;
                    this.filteredList3 = this.list3;
                } else {
                    this.showError3 = false;
                }
            }, 500);
        }
    }
 


  gotoAddCourse(){
    this.router.navigate(['lms-dnt/admin/add-course'])
  }

}
