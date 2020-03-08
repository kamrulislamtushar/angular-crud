import { Component, OnInit } from '@angular/core';
import { MemberService } from '../_services'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = true;
  constructor(
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
    this.memberService.getMembers()
  }

}
