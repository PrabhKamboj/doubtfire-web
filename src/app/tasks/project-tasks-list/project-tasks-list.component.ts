import { Component, Input, Output, EventEmitter } from '@angular/core';
import angular from 'angular';
angular.module('doubtfire.tasks.project-tasks-list', [])

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
  @Output() taskSelected = new EventEmitter();

  groupTasks: any[] = [];
  statusClass: any;
  statusText: any;
  constructor() {}
}

//
// Displays the tasks associated with a student's project which
// when a task is clicked will automatically jump to the task viewer
// of the task that was clicked
//

.directive('projectTasksList', () => ({
  replace: true,
  restrict: 'E',
  templateUrl: 'tasks/project-tasks-list/project-tasks-list.component.html',

  scope: {
    unit: "=",
    project: "=",
    onSelect: "=",
    inMenu: '@'
  },

  controller($scope: { groupTasks: { push?: any; }; unit: { groupSets: { map: (arg0: (gs: any) => { groupSet: any; name: any; }) => any; length: number; }; groupSetsCache: { get: (arg0: any) => any; }; }; statusClass: any; statusText: any; taskDisabled: (task: any) => boolean; project: { targetGrade: number; }; groupSetName: (id: any) => any; hideGroupSetName: boolean; taskText: (task: any) => any; }, $modal: any, newTaskService: { statusClass: any; statusText: any; }, analyticsService: { event: (arg0: string, arg1: string) => void; }, gradeService: { gradeAcronyms: { [x: string]: string; }; }) {
    analyticsService.event('Student Project View', "Showed Task Button List");

    $scope.groupTasks = [];

    $scope.groupTasks.push.apply($scope.groupTasks, $scope.unit.groupSets.map((gs: { name: any; }) => ({
      groupSet: gs,
      name: gs.name
    })));

    $scope.groupTasks.push({groupSet: null, name: 'Individual Work'});

    // functions from task service
    $scope.statusClass = newTaskService.statusClass;
    $scope.statusText = newTaskService.statusText;

    $scope.taskDisabled = (task: { definition: { targetGrade: number; }; }) => task.definition.targetGrade > $scope.project.targetGrade;

    $scope.groupSetName = (id: any) => __guard__($scope.unit.groupSetsCache.get(id), (x: { name: any; }) => x.name) || "Individual Work";

    $scope.hideGroupSetName = $scope.unit.groupSets.length === 0;

    return $scope.taskText = function(task: { definition: { abbreviation: any; isGraded: any; maxQualityPts: string | number; }; grade: string | number; qualityPts: string; }) {
      let result = task.definition.abbreviation;

      if (task.definition.isGraded) {
        if (task.grade != null) {
          result += " (" + gradeService.gradeAcronyms[task.grade] + ")";
        } else {
          result += " (?)";
        }
      }

      if (Number(task.definition.maxQualityPts) > 0) {
        if (task.qualityPts != null) {
          result += " (" + task.qualityPts + "/" + task.definition.maxQualityPts + ")";
        } else {
          result += " (?/" + task.definition.maxQualityPts + ")";
        }
      }


      return result;
    };
  }
}));

function __guard__(value: any, transform: { (x: any): any; (arg0: any): any; }) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

function directive(arg0: string, arg1: () => { replace: boolean; restrict: string; templateUrl: string; scope: { unit: string; project: string; onSelect: string; inMenu: string; }; controller($scope: { groupTasks: { push?: any; }; unit: { groupSets: { map: (arg0: (gs: any) => { groupSet: any; name: any; }) => any; length: number; }; groupSetsCache: { get: (arg0: any) => any; }; }; statusClass: any; statusText: any; taskDisabled: (task: any) => boolean; project: { targetGrade: number; }; groupSetName: (id: any) => any; hideGroupSetName: boolean; taskText: (task: any) => any; }, $modal: any, newTaskService: { statusClass: any; statusText: any; }, analyticsService: { event: (arg0: string, arg1: string) => void; }, gradeService: { gradeAcronyms: { [x: string]: string; }; }): (task: { definition: { abbreviation: any; isGraded: any; maxQualityPts: string | number; }; grade: string | number; qualityPts: string; }) => any; }) {
  throw new Error('Function not implemented.');
}
