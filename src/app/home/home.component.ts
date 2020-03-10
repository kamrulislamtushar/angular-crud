import { Component, OnInit } from '@angular/core';
import { MemberService } from '../_services'
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../_services'
import { Role } from '../_models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  memberForm: FormGroup;
  submitted = false;
  isLoading = true;
  members;
  error: string;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private authenticationService: AuthenticationService
  ) { }

  get form() {
    return this.memberForm.controls;
  }
  isAdmin() {
    return this.authenticationService.currentUserValue.role == Role.Admin
  }
  ngOnInit() {
    this.memberForm = this.formBuilder.group({
      name: ['', Validators.required],
      identity: ['', Validators.required],
      department: ['', Validators.required]
    });
    this.memberService.getMembers()
      .pipe(first())
      .subscribe(
        data => {
          this.members = data;
          this.isLoading = false;
        },
        error => {
          this.error = error;
          this.isLoading = false;
        });
  }
  removeMember(id) {
    if (!this.isAdmin()) {
      this.error = "You do not have access to make this modification";
      return;
    }
    this.isLoading = true;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3a0668',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.memberService.deleteMember(id)
          .pipe(first())
          .subscribe(
            data => {
              this.members = data
              Swal.fire(
                'Deleted!',
                'The member has been deleted.',
                'success'
              )
              this.isLoading = false;
            },
            error => {
              this.error = error;
              this.isLoading = false;
              Swal.fire(
                'Error!',
                this.error,
                'error'
              )
            });
      } else {
        this.isLoading = false;
      }
    })
  }
  onSubmit() {
    this.submitted = true;
    if (this.memberForm.invalid) {
      return;
    }
    this.isLoading = true;
    // Calling athetication service provides login method to authenticate user by calling api
    this.memberService.addMember(this.form)
      .pipe(first())
      .subscribe(
        data => {
          this.isLoading = false;
        },
        error => {
          this.error = error;
          this.isLoading = false;
        });
  }
}
