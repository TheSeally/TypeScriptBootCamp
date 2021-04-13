export class SortingService {
    private index: number = 0;
    private lastSortedElem: number = this.data.length - 1;
    private isChanged: boolean = false;
    private isCompleted: boolean = false;

    constructor(private data: number[]) { }

    private updateSortingProgress(): void {
        this.index = 0;
        this.isChanged = false;
        this.lastSortedElem -= 1;
    }

    isSortingComplete(): boolean {
        return this.isCompleted;
    }

    step(): number[] {
        const isIterationComplete = this.index > this.lastSortedElem || this.index > this.data.length;
        const shouldStartNewIteration = isIterationComplete && this.isChanged

        this.isCompleted = isIterationComplete && !this.isChanged;

        if (this.isCompleted) {
            return this.data;
        }

        if (shouldStartNewIteration) {
            this.updateSortingProgress();
        }

        const leftElem = this.data[this.index];
        const rightElem = this.data[this.index + 1];

        if (rightElem < leftElem) {
            this.data[this.index] = rightElem;
            this.data[this.index + 1] = leftElem;

            this.isChanged = true;
        }

        this.index += 1;

        return this.data;
    }
}
