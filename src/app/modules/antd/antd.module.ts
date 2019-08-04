import { NgModule } from '@angular/core';
import {
  NzButtonModule,
  NzLayoutModule,
  NzMenuModule,
  NzBreadCrumbModule,
  NzIconModule,
  NzListModule,
  NzSkeletonModule,
  NzAvatarModule,
  NzBadgeModule,
  NzCardModule,
  NzTypographyModule
} from 'ng-zorro-antd';

@NgModule({
  imports: [
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzListModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzBadgeModule,
    NzCardModule,
    NzTypographyModule
  ],
  exports: [
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzListModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzBadgeModule,
    NzCardModule,
    NzTypographyModule
  ]
})
export class AntdModule {}
