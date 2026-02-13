import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDescription } from './item-description';

describe('ItemDescription', () => {
  let component: ItemDescription;
  let fixture: ComponentFixture<ItemDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDescription);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
