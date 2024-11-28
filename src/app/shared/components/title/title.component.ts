import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class TitleComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  @Input() pageTitle: string | undefined;

  ngOnInit(): void {
    if (!this.pageTitle) {
      this.pageTitle = this.activatedRoute.snapshot.data['title'];
    }
  }
}
