import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangueGameComponent } from './langue-game.component';

describe('LangueGameComponent', () => {
  let component: LangueGameComponent;
  let fixture: ComponentFixture<LangueGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangueGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangueGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
