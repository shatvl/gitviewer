import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
