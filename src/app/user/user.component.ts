import { Component, NgZone } from '@angular/core';
import { ApiService } from '../api.service';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

    userForm !: FormGroup;
    editForm !: FormGroup;
    detailForm !: FormGroup;
    users: any = [];
    usersPerPage: number = 3;
    currentPage: number = 1;
    totalUsers: number = 0;
    pageSizes: number[] = [3, 6, 12];
    totalPages: number = 0;
    selectedUser: any;
    
  
    constructor(private apiService: ApiService, private formBuilder: FormBuilder, private ngZone: NgZone) {}

    ngOnInit(): void {
      this.userForm = this.formBuilder.group({
        name: ["", Validators.required],
        job: [""],
      });

      this.detailForm = this.formBuilder.group({
        email: [''],
        first_name: [''],
        last_name: ['']
      });
  
      this.editForm = this.formBuilder.group({
        id:[''],
        email:[''],
        first_name:[''],
        last_name:[''],
        avatar: [''],
  
      });
      this.getUsers();
    }

    getUsers(): void {
      this.apiService.getUsers().subscribe(
        (response) => {
          if (response && response.data) {
            this.users = response.data; 
            this.totalUsers = response.total;
            this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
            this.displayedUsers();

            console.log('Felhasználok:', this.users);
            
          }
        },
        (error) => {
          console.error('Felhasznalok lekerese sikertelen!', error);
        }
      );

    }

    refreshUsers(): void {
      this.getUsers();
    }

    nextPage() {
      this.currentPage = 1;
      this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);//
      this.refreshUsers();
    }
  
    displayedUsers() {
      const startIndex = (this.currentPage - 1) * this.usersPerPage;
      const endIndex = startIndex + this.usersPerPage;
      this.users = this.users.slice(startIndex, endIndex);
    }
  
    changePage(delta: number) {
      this.currentPage += delta;
      this.refreshUsers();
    }

    onClick(){
      if (this.checkInput()){
        this.addUser();
      }
    }

    addUser() {
      let data = {
        name: this.userForm.value.name,
        job: this.userForm.value.job,
      };
    
      this.clearField();
      this.apiService.createUser(data).subscribe({
        next: (data: any) => {
          console.log('Szerver válasza:', data);
          this.getUsers();
            console.log('Felhasználó sikeresen hozzáadva', data);
            
        },
        error: (err: any) => {
          console.error('Error:', err);
        }
      });
    }

    checkInput() {
      const nameInput = (<HTMLInputElement>document.getElementById('name')).value;

      let errorMessage = "";
  
      if (nameInput.trim().length < 5) {
        errorMessage += "Name should be at least 5 characters long!\n";
      }
  
      if (!/^[A-Z][a-zA-Z0-9\s]+$/.test(nameInput)) {
        errorMessage += "Name should start with an uppercase letter!\n";
      }
  
      if (errorMessage !== "") {
        alert(errorMessage);
        return false;
      }
      
      return true;
    }

    clearField() {
      this.userForm.patchValue({
          email: '', 
          first_name: '',
          last_name: '',
          avatar: '',
      });
    }

    deleteUser(id: number): void {
      this.apiService.deleteUser(id).subscribe({
        next: (response: any) => {
          if (response && response.data) {
            console.log('Válasz adatok:', response.data);
          }
          this.getUsers();
          alert("Felhasznalo sikeresen torolve, Felhasznalo id:" + id);
        },
        error: (error: any) => {
          console.error('Hiba:', error);
        }
      });
    }

    editUser(user: any) {
      this.editForm.patchValue({id: user.id});
      this.editForm.patchValue({email: user.email});
      this.editForm.patchValue({first_name: user.first_name});
      this.editForm.patchValue({last_name: user.last_name});
      this.editForm.patchValue({avatar: user.avatar});
  
     // console.log("megy");
    }
  
    updateUser(){
      let data = {
        id: this.editForm.value.id,
        email: this.editForm.value.email,
        first_name: this.editForm.value.first_name,
        last_name: this.editForm.value.last_name,
        avatar: this.editForm.value.avatar,
      };
  
      this.apiService.updateUser(data.id, data).subscribe({
        next: (response: any) => { 
          console.log(response);
          this.getUsers();
          console.log("felhasznalo frissitve", response);
          
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    }

    detailUser(user: any){
      this.selectedUser = user;  
      this.detailForm.patchValue({email: user.email});
      this.detailForm.patchValue({first_name: user.first_name});
      this.detailForm.patchValue({last_name: user.last_name});
    }
  }
  