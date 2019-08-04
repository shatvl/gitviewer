import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { GitUser } from 'src/app/models/git-user.model';

@Component({
  selector: 'app-git-user',
  templateUrl: './git-user.component.html',
  styleUrls: ['./git-user.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GitUserComponent implements OnInit {
  @Input('user') user: GitUser;

  constructor() {}

  ngOnInit() {}
}
