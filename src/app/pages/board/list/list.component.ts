import { Component, Input } from '@angular/core';
import { List } from 'src/app/model/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() list: List;

}
