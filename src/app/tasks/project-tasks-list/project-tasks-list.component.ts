import { Component, Input, Inject } from '@angular/core';

@Component({
  selector: 'project-tasks-list',
  templateUrl: 'project-tasks-list.component.html',
  styleUrls: ['project-tasks-list.component.scss'],
})
export class ProjectTasksListComponent {
  @Input() hideGroupSetName: boolean;
  @Input() groupTasks: unknown[];
  @Input() project: unknown;
  constructor() {}
}
