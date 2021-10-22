import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoDirective } from './demo.directive';

@Component({
  template: `<div demo></div>`,
})
class HostComponent {}

describe('DemoDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, DemoDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should change the text content', () => {
    const subject = fixture.debugElement.nativeElement;

    subject.firstChild.dispatchEvent(new Event('mouseover'));
    expect(subject.textContent).toEqual('hovering');

    subject.firstChild.dispatchEvent(new Event('mouseout'));
    expect(subject.textContent).toEqual('not hovering');
  });

  it('should get the instance', () => {
    const instance = fixture.debugElement.nativeElement;
    expect(instance).toBeDefined();
  });
});
