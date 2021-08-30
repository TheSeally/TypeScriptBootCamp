type sortingGenerator = IterableIterator<number[]>

export class SortingService {
    private iterationCount: number = 0;
    private isCompleted: boolean = false;
    private generator: sortingGenerator;

    constructor(private data: number[]) {
        this.generator = this.setDataSequence();
    }

    public isSortingComplete(): boolean {
        return this.isCompleted;
    }

    private *setDataSequence(): sortingGenerator {
        const iterationSize = this.data.length - this.iterationCount;
        let isChanged = false;

        for (let index = 0; index < iterationSize; index++) {
            const leftElem = this.data[index];
            const rightElem = this.data[index + 1];

            if (rightElem < leftElem) {
                this.data[index] = rightElem;
                this.data[index + 1] = leftElem;

                isChanged = true;
            }

            yield this.data;
        }

        this.iterationCount += 1

        if (isChanged) {
            yield* this.setDataSequence();
        }

        return this.data;
    }

    public step(): number[] {
        const nextIteration = this.generator.next();

        this.isCompleted = nextIteration.done ?? false;

        return nextIteration.value ?? this.data;
    }
}
