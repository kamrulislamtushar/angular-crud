import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services'
import { Role } from '../_models';
import { MemberService } from '../_services'
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {
  memberForm: FormGroup;
  submitted = false;
  isLoading = true;
  member;
  memberId;
  error: string;
  message: string;
  finalData: object
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private authenticationService: AuthenticationService
  ) { }
  ngOnInit() {
    this.memberForm = this.formBuilder.group({
      name: [null, Validators.required],
      id: [null, Validators.required],
      department: [null, Validators.required]
    });
    this.memberId = this.route.snapshot.paramMap.get('id');
    this.memberService.memberDetails(this.memberId)
      .pipe(first())
      .subscribe(
        data => {
          this.member = data;
          this.memberForm.setValue(this.member)
          this.isLoading = false;
        },
        error => {
          this.error = error;
          this.isLoading = false;
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
      id: this.form.id.value,
      name: this.form.name.value,
      department: this.form.department.value
    }
    this.memberService.editMember(this.finalData, this.memberId)
      .pipe(first())
      .subscribe(
        data => {
          this.message = "Member Updated Successfully!"
          this.isLoading = false;
        },
        error => {
          this.error = error;
          this.isLoading = false;
        });
  }
}
