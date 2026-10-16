import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';


@Component({
  selector: 'app-commit-table',
  imports: [CommonModule, BadgeAtom],
  templateUrl: './commit-table.html',
  styleUrl: './commit-table.scss',
})
export class CommitTable {

}
