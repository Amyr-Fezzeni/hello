import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  
  currentDate;
  allTasks = [];
  showAddButton = true;
  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
    this.dataService.getAllTasks()
    .subscribe(res =>{
      // console.log(res);
      this.allTasks = [];
      this.allTasks = res;
      console.log(this.allTasks);
    })
  }
  print(note){
    console.log(note.title);
  }editChecked(task) {
    task.checked = !task.checked;
    console.log(task.text)
    this.dataService.updateTask(task);
  }

  onDelete(idTask) {
    this.dataService.deleteTask(idTask)
    .then((response) => {
        alert('Task Deleted');
        this.ngOnInit();
      },
    );
  }

  toggleShowAdd() {
    this.showAddButton = !this.showAddButton;
  }

  onAddTask(taskText) {
    this.dataService
      .addTask({
        text: taskText,
        date: new Date().toString(),
        checked: false,
      })
      .then((response) => {
          alert('Task Added');
          this.toggleShowAdd();
          this.ngOnInit();
        },
       
      ).catch((error) => console.log(error));
  }
}