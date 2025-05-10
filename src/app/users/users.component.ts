import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe],
  templateUrl: './users.component.html'
})
export class UsersComponent {

  private userService = inject(UsersService);
  public users$ = this.userService.getUsers().pipe(takeUntilDestroyed());

}
