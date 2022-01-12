import { Inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { projectService, unitService } from 'src/app/ajs-upgraded-providers';

export class DoubtfireViewState {
  public EntityObject: any; // Unit | Project | undefined
  public EntityType: 'unit' | 'project' | 'other' = 'other';
}

export enum ViewType {
  UNIT = 'UNIT',
  PROJECT = 'PROJECT',
  OTHER = 'OTHER',
}
@Injectable({
  providedIn: 'root',
})
/**
 * The global state for the current user. This uses replay subjects, which acts as subjects, but allow
 * for subscribers to request the previously emitted value.
 *
 * This maintains two sets of values:
 * - Units taught and subjects studied
 * - Current view and selected entity
 */
export class GlobalStateService {
  /**
   * The current view and entity, indicating what kind of page is being shown.
   */
  public currentViewAndEntitySubject: ReplaySubject<{ viewType: ViewType; entity: {} }> = new ReplaySubject<{
    viewType: ViewType;
    entity: {};
  }>();

  /**
   * A Unit Role for when a tutor is viewing a Project.
   */
  public unitRoleSubject: ReplaySubject<any> = new ReplaySubject<any>();

  /**
   * The list of all of the units taught by the current user
   */
  public unitRolesSubject: ReplaySubject<any> = new ReplaySubject<any>();

  /**
   * The list of all of the units studied by the current user
   */
  public projectsSubject: ReplaySubject<any> = new ReplaySubject<any>();

  constructor(
    @Inject(unitService) private UnitService: any,
    @Inject(projectService) private ProjectService: any
  ) {
    this.loadUnitsAndProjects();
  }

  /**
   * Query the API for the units taught and studied by the current user.
   */
  public loadUnitsAndProjects() {
    //TODO: Consider sequence here? Can we adjust to fail once.
    this.UnitService.getUnitRoles((roles: any) => {
      this.unitRolesSubject.next(roles);
    });

    this.ProjectService.getProjects(false, (projects: any) => {
      this.projectsSubject.next(projects);
    });
  }

  /**
   * Clear all of the project and unit role data on sign out
   */
  public clearUnitsAndProjects() {
    this.unitRolesSubject.next(null);
    this.projectsSubject.next(null);
  }

  /**
   * Switch to a new view, and its associated entity object
   */
  public setView(kind: ViewType, entity?: any) {
    this.currentViewAndEntitySubject.next({ viewType: kind, entity: entity });
  }
}
