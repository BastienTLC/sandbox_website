import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessRowComponent } from './process-row.component';

describe('ProcessRowComponent', () => {
  let component: ProcessRowComponent;
  let fixture: ComponentFixture<ProcessRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
