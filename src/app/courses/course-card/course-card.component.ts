import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Course from 'src/models/course';
import { CourseService } from '../shared/course.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent {
  @Output() courseSelection: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() courseUpdate: EventEmitter<Course> = new EventEmitter<Course>();

  @Input() course?: Course;
  @Input() courseNumber?: number;
  @Input() isEven?: boolean = false;
  @Input() isFirst?: boolean = false;
  @Input() isLast?: boolean = false;
  @Input() isOdd?: boolean = false;

  constructor(
    private courseService: CourseService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.course) {
      // If there is no `course`, we must have it from the route
      const id = Number(this.route.snapshot.paramMap.get('id'));

      this.courseService.getCourse(id).subscribe((course: Course) => {
        this.course = course;
      });
    }
  }

  onDescChange(descVal: string): void {
    if (this.course) {
      this.course.description = descVal;
    }
  }

  onGoBack(): void {
    this.location.back();
  }

  onSelectClick(): void {
    this.courseSelection.emit(this.course);
  }

  onUpdateClick(): void {
    this.courseUpdate.emit(this.course);
  }
}
