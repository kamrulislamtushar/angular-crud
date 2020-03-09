import { Component, OnInit } from '@angular/core';
import { MemberService } from '../_services'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = true;
  members;
  error: string;
  
  constructor(
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
    this.memberService.getMembers()
    .pipe(first())
    .subscribe(
        data => {
            this.members =  data;
            this.isLoading = false;
            console.log(this.members)
        },
        error => {
            this.error = error;
            this.isLoading = false;
        });
  }

}
