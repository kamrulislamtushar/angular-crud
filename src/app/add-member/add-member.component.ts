import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services'
import { Role } from '../_models';
import { MemberService } from '../_services'
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
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
  finalData: object;
  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.memberForm = this.formBuilder.group({
      name: [null, Validators.required],
      age: [null, Validators.required]
    });
  }
  get form() {
    return this.memberForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.memberForm.invalid) {
      return;
    }
    this.isLoading = true;

    this.finalData = {
      name: this.form.name.value,
      age: this.form.age.value
    }
    this.memberService.addMember(this.finalData)
      .pipe(first())
      .subscribe(
        data => {
          this.message = "Player added successfully!"
          this.isLoading = false;
          this.router.navigate(['/'])
        },
        error => {
          this.error = error;
          this.isLoading = false;
        });
  }
}
