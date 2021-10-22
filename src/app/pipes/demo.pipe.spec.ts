import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DemoPipe } from "./demo.pipe";

@Component({
    template: `<div>{{ prop | avg }}</div>`
})
class HostComponent {
    public prop: number[] = new Array<number>();
}

describe('DemoPipe', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, DemoPipe]
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
    });

    it('should compute the average of a given list of numbers', () => {
        component.prop = [3, 5, 7];
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.firstChild.textContent).toEqual('5');
    });
});
