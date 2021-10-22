import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'avg'})
export class DemoPipe implements PipeTransform {
    
    transform(numbers: Array<number>) {
        return numbers.reduce((a, b) => a + b) / numbers.length;
    }

}
