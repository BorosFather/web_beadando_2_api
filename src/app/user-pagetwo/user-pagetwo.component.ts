// import { Component, NgZone } from '@angular/core';
// import { ApiService } from '../api.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-user-pagetwo',
//   templateUrl: './user-pagetwo.component.html',
//   styleUrls: ['./user-pagetwo.component.scss']
// })
// export class UserPagetwoComponent {
  
//       userForm !: FormGroup;
//       editForm !: FormGroup;
//       users: any = [];
//       message!:any;
//       errmess: any;
//       usersPerPage: number = 10;
//       currentPage: number = 1;
//       totalUsers: number = 0;
//       pageSizes: number[] = [10, 20, 30];
//       totalPages: number = 0;
    
//       constructor(private apiService: ApiService, private formBuilder: FormBuilder, private ngZone: NgZone) {}
  
//       ngOnInit(): void {
//         this.userForm = this.formBuilder.group({
//           email:['', Validators.required],
//           first_name:[''],
//           last_name:[''],
//           avatar: [''],
//         });
    
//         this.editForm = this.formBuilder.group({
//           id:[''],
//           email:['', Validators.required],
//           first_name:[''],
//           last_name:[''],
//           avatar: [''],
    
//         });
//         this.getSecondUsers();
//       }
  
//       getSecondUsers(): void {
//         this.apiService.getSecondUsers().subscribe(
//           (response) => {
//             if (response && response.data) {
//               this.users = response.data; 
//               this.totalUsers = this.users.length;
//               this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
//               this.displayedUsers();
//             }
//           },
//           (error) => {
//             console.error('Error while fetching users:', error);
//           }
//         );
//       }
      
  
//       nextPage() {
//         this.currentPage = 1;
//         this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);//
//         this.getSecondUsers();
//       }
    
//       displayedUsers() {
//         const startIndex = (this.currentPage - 1) * this.usersPerPage;
//         const endIndex = startIndex + this.usersPerPage;
//         this.users = this.users.slice(startIndex, endIndex);
//       }
    
//       changePage(delta: number) {
//         this.currentPage += delta;
//         this.getSecondUsers();
//       }
  
//       onClick(){
//         if (this.checkInput()){
//           this.addUser();
//         }
//       }

//       addUser() {
//         let data = {
//           email: this.userForm.value.email,
//           first_name: this.userForm.value.first_name,
//           last_name: this.userForm.value.last_name,
//           avatar: this.userForm.value.avatar,
//         };
      
//         this.clearField();
      
//         this.apiService.createSecondUser(data).subscribe({
//           next: (response: any) => {
//             if (response && response.data) {
//               console.log('vissza: ' + response.data);
//               this.message = response.message;
//               this.getSecondUsers();
//               console.log(response);
//             }
//             console.log('User add successfully.');
//           },
//           error: (err: any) => {
//             console.error('Error:', err);
//           }
//         });
//       }
      
  
//       checkInput() {
  
//         const first_nameInput = (<HTMLInputElement>document.getElementById('first_name')).value;
//         const last_nameInput = parseInt((<HTMLInputElement>document.getElementById('last_name')).value);
    
//         let errorMessage = "";
    
//         if (first_nameInput.trim().length < 5) {
//           errorMessage += "Name should be at least 5 characters long!\n";
//         }
    
//         if (!/^[a-zA-Z\s]+$/.test(first_nameInput)) {
//           errorMessage += "nagy!\n";
//         }
//         // if (last_nameInput.trim().length < 5) {
//         //   errorMessage += "Name should be at least 5 characters long!\n";
//         // }
    
//         // if (!/^[a-zA-Z\s]+$/.test(last_nameInput)) {
//         //   errorMessage += "Name should be at least 5 characters long!\n";
//         // }
    
    
//         if (errorMessage !== "") {
//           alert(errorMessage);
//           return false;
//         }
//         return true;
//       }
  
//       clearField() {
//         this.userForm.patchValue({
//             email: '', 
//             first_name: '',
//             last_name: '',
//             avatar: '',
//         });
//       }
    
//       deleteSecondUser(id: number): void {
//         this.apiService.deleteSecondUser(id).subscribe(
//           (response) => {
  
//             if (response && response.data) {
//               this.users = response.data;
//             }
//             this.getSecondUsers();
            
//             console.log('User deleted successfully.');
            
//           },
//           (error) => {
//             console.error('Error:', error);
//           }
//         );
//       }
  
//       editUser(user: any) {
//         this.editForm.patchValue({id: user.id});
//         this.editForm.patchValue({email: user.email});
//         this.editForm.patchValue({first_name: user.first_name});
//         this.editForm.patchValue({last_name: user.last_name});
//         this.editForm.patchValue({avatar: user.avatar});
    
//        // console.log("megy");
//       }
    
//       updateSecondUser(){
//         let data = {
//           id: this.editForm.value.id,
//           email: this.editForm.value.email,
//           first_name: this.editForm.value.first_name,
//           last_name: this.editForm.value.last_name,
//           avatar: this.editForm.value.avatar,
//         };
    
//         this.apiService.updateSecondUser(data.id, data).subscribe({
//           next: (res:any) => { 
//             console.log(res.message);
            
//             this.message = res.message;
//             this.getSecondUsers();
  
//             console.log('User updata successfully.');
          
//           },
//           error: (err) => {
//             console.error('Error:', err);
//           }
//         });
//       }
//     }
    
// // user-pagetwo.component.ts


// // import { Component, NgZone } from '@angular/core';
// // import { UserService } from '../user.service';
// // import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { ApiService } from '../api.service';

// // @Component({
// //   selector: 'app-user-pagetwo',
// //   templateUrl: './user-pagetwo.component.html',
// //   styleUrls: ['./user-pagetwo.component.scss']
// // })
// // export class UserPagetwoComponent {
  
// //   userForm !: FormGroup;
// //   editForm !: FormGroup;
// //   users: any = [];
// //   message!: any;
// //   errmess: any;
// //   usersPerPage: number = 10;
// //   currentPage: number = 1;
// //   totalUsers: number = 0;
// //   pageSizes: number[] = [10, 20, 30];
// //   totalPages: number = 0;
  

// //   constructor(private userService: UserService, private formBuilder: FormBuilder, private ngZone: NgZone) {}

// //   ngOnInit(): void {
// //     this.userForm = this.formBuilder.group({
// //       email: ['', Validators.required],
// //       first_name: [''],
// //       last_name: [''],
// //       avatar: [''],
// //     });

// //     this.editForm = this.formBuilder.group({
// //       id: [''],
// //       email: ['', Validators.required],
// //       first_name: [''],
// //       last_name: [''],
// //       avatar: [''],
// //     });
// //     this.getSecondUsers();
// //   }

// //   getSecondUsers(): void {
// //     this.userService.getSecondUsers().subscribe(
// //       (response) => {
// //         if (response && response.data) {
// //           this.users = response.data;
// //           this.totalUsers = this.users.length;
// //           this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
// //           this.displayedUsers();
// //         }
// //       },
// //       (error) => {
// //         console.error('Error while fetching users:', error);
// //       }
// //     );
// //   }

// //   nextPage() {
// //     this.currentPage = 1;
// //     this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
// //     this.getSecondUsers();
// //   }

// //   displayedUsers() {
// //     const startIndex = (this.currentPage - 1) * this.usersPerPage;
// //     const endIndex = startIndex + this.usersPerPage;
// //     this.users = this.users.slice(startIndex, endIndex);
// //   }

// //   changePage(delta: number) {
// //     this.currentPage += delta;
// //     this.getSecondUsers();
// //   }

// //   onClick() {
// //     if (this.checkInput()) {
// //       this.addUser();
// //     }
// //   }

// //   addUser() {
// //     let data = {
// //       email: this.userForm.value.email,
// //       first_name: this.userForm.value.first_name,
// //       last_name: this.userForm.value.last_name,
// //       avatar: this.userForm.value.avatar,
// //     };

// //     this.clearField();

// //     this.userService.createSecondUser(data).subscribe({
// //       next: (response: any) => {
// //         if (response && response.data) {
// //           console.log('vissza: ' + response.data);
// //           this.message = response.message;
// //           this.getSecondUsers();
// //           console.log(response);
// //         }
// //         console.log('User add successfully.');
// //       },
// //       error: (err: any) => {
// //         console.error('Error:', err);
// //       }
// //     });
// //   }

// //   checkInput() {
// //     const first_nameInput = (<HTMLInputElement>document.getElementById('first_name')).value;
// //     const last_nameInput = parseInt((<HTMLInputElement>document.getElementById('last_name')).value);

// //     let errorMessage = "";

// //     if (first_nameInput.trim().length < 5) {
// //       errorMessage += "Name should be at least 5 characters long!\n";
// //     }

// //     if (!/^[a-zA-Z\s]+$/.test(first_nameInput)) {
// //       errorMessage += "nagy!\n";
// //     }

// //     if (errorMessage !== "") {
// //       alert(errorMessage);
// //       return false;
// //     }
// //     return true;
// //   }

// //   clearField() {
// //     this.userForm.patchValue({
// //       email: '',
// //       first_name: '',
// //       last_name: '',
// //       avatar: '',
// //     });
// //   }

// //   deleteSecondUser(id: number): void {
// //     this.userService.deleteSecondUser(id).subscribe(
// //       (response) => {
// //         if (response && response.data) {
// //           this.users = response.data;
// //         }
// //         this.getSecondUsers();

// //         console.log('User deleted successfully.');

// //       },
// //       (error) => {
// //         console.error('Error:', error);
// //       }
// //     );
// //   }

// //   editUser(user: any) {
// //     this.editForm.patchValue({id: user.id});
// //     this.editForm.patchValue({email: user.email});
// //     this.editForm.patchValue({first_name: user.first_name});
// //     this.editForm.patchValue({last_name: user.last_name});
// //     this.editForm.patchValue({avatar: user.avatar});
// //   }

// //   updateSecondUser() {
// //     let data = {
// //       id: this.editForm.value.id,
// //       email: this.editForm.value.email,
// //       first_name: this.editForm.value.first_name,
// //       last_name: this.editForm.value.last_name,
// //       avatar: this.editForm.value.avatar,
// //     };

// //     this.userService.updateSecondUser(data.id, data).subscribe({
// //       next: (res: any) => {
// //         console.log(res.message);

// //         this.message = res.message;
// //         this.getSecondUsers();

// //         console.log('User updata successfully.');

// //       },
// //       error: (err) => {
// //         console.error('Error:', err);
// //       }
// //     });
// //   }
// // }
