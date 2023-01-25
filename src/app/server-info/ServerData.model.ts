export class ServerDataModel {
    usedMemory: number;
    totalMemory: number;
    freeMemory: number;

    constructor(usedMemory:number, totalMemory: number, freeMemory: number) {
        this.freeMemory = freeMemory;
        this.usedMemory = usedMemory;
        this.totalMemory = totalMemory;
    }
}
