import { Component, Input, Inject } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'project-tasks-list',
  templateUrl: 'project-tasks-list.component.html',
  styleUrls: ['project-tasks-list.component.scss'],
})
export class ProjectTasksListComponent {
  @Input() hideGroupSetName: boolean;
  @Input() groupTasks: any[];
  @Input() project: any;
  constructor() {}
}
