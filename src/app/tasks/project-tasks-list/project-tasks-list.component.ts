import {Component, Input, Inject} from '@angular/core';
import {gradeService, analyticsService} from 'src/app/ajs-upgraded-providers';

@Component({
  selector: 'project-tasks-list',
  templateUrl: 'project-tasks-list.component.html',
  styleUrls: ['project-tasks-list.component.scss'],
})
export class ProjectTasksListComponent {
  @Input() unit: any;
  @Input() project: any;
  @Input() onSelect: any;
  @Input() inMenu: string;

  groupTasks: any[] = [];

  constructor(@Inject('newTaskService') private newTaskService: any,
    @Inject(gradeService) private gradeService: any,
    @Inject(analyticsService) private analyticsService: any
  ) {
    analyticsService.event('Student Project View', 'Showed Task Button List');

    this.groupTasks.push(
      ...this.unit.groupSets.map((gs) => ({
        groupSet: gs,
        name: gs.name,
      })),
    );

    this.groupTasks.push({groupSet: null, name: 'Individual Work'});
  }

  statusClass(status: string) {
    return this.newTaskService.statusClass(status);
  }

  statusText(status: string) {
    return this.newTaskService.statusText(status);
  }

  taskDisabled(task: any) {
    return task.definition.targetGrade > this.project.targetGrade;
  }

  groupSetName(id: any) {
    return this.unit.groupSetsCache.get(id)?.name || 'Individual Work';
  }

  hideGroupSetName() {
    return this.unit.groupSets.length === 0;
  }

  taskText(task: any) {
    let result = task.definition.abbreviation;

    if (task.definition.isGraded) {
      if (task.grade) {
        result += ` (${gradeService.gradeAcronyms[task.grade]})`;
      } else {
        result += ' (?)';
      }
    }

    if (task.definition.maxQualityPts > 0) {
      if (task.qualityPts) {
        result += ` (${task.qualityPts}/${task.definition.maxQualityPts})`;
      } else {
        result += ` (?/${task.definition.maxQualityPts})`;
      }
    }

    return result;
  }
}
