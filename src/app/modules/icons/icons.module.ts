import { NgModule } from '@angular/core';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd';
import {
  StarTwoTone,
  StarOutline,
  LoadingOutline,
  DeleteOutline,
  SaveOutline
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
  StarTwoTone,
  StarOutline,
  LoadingOutline,
  DeleteOutline,
  SaveOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class IconsModule {}
