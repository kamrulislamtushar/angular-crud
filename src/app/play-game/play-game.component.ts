import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../_services";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit {
  gameForm: FormGroup;
  submitted = false;
  isLoading = false;
  members;
  error: string;
  message: string;
  finalData;
  gameResult;
  liveScore;
  constructor(
      private formBuilder: FormBuilder,
      private memberService: MemberService,
  ) { }

  ngOnInit(): void {
    this.gameForm = this.formBuilder.group({
      gamePoint: [null, Validators.required]
    });
  }
  get form() {
    return this.gameForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.gameForm.invalid) {
      return;
    }
    this.isLoading = true;

    this.finalData = {
      gamePoint: this.form.gamePoint.value,
    };
    this.memberService.playGame(this.finalData)
        .pipe(first())
        .subscribe(
            data => {
              this.gameResult = data;
              this.message = 'Game completed successfully!';
              this.isLoading = false;
            },
            error => {
              this.error = error;
              this.isLoading = false;
            });
  }
  getScore() {
    this.memberService.getLiveScore()
        .pipe(first())
        .subscribe(
            data => {
              this.liveScore = data;
            },
            error => {
              this.error = error;
            });
  }
}
