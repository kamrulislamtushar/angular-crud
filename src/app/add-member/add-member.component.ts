import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services'
import { Role } from '../_models';
import { MemberService } from '../_services'
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  memberForm: FormGroup;
  submitted = false;
  isLoading = false;
  members;
  error: string;
  message: string;
  finalData: object
  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private authenticationService: AuthenticationService
  ) { }
  ngOnInit() {
    this.memberForm = this.formBuilder.group({
      name: [null, Validators.required],
      identity: [null, Validators.required],
      department: [null, Validators.required]
    });
  }
  get form() {
    return this.memberForm.controls;
  }
  isAdmin() {
    return this.authenticationService.currentUserValue.role == Role.Admin
  }

  onSubmit() {
    this.submitted = true;
    if (this.memberForm.invalid) {
      return;
    }
    this.isLoading = true;

    this.finalData = {
      id: this.form.identity.value,
      name: this.form.name.value,
      department: this.form.department.value
    }
    this.memberService.addMember(this.finalData)
      .pipe(first())
      .subscribe(
        data => {
          this.message = "Member added successfully!"
          this.isLoading = false;
        },
        error => {
          this.error = error;
          this.isLoading = false;
        });
  }
}
