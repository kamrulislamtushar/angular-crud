import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services'
import { MemberService } from '../_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.scss']
})
export class ViewMemberComponent implements OnInit {
  isLoading = true;
  member;
  error: string;
  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.memberService.memberDetails(id)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          this.member = data;
          this.isLoading = false;
        },
        error => {
          this.error = error;
          this.isLoading = false;
        });
  }

}
