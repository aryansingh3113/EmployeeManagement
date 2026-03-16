import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
    name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

    transform(value:number, num:number, decimal:number=0){
        return ((value / num)*100).toFixed(decimal);
    }
}