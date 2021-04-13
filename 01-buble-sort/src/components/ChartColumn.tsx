import React from 'react';
import { IColumn } from './App';

export function ChartColumn({ height }:  IColumn): JSX.Element {
    return (
        <div className="chart__column" style={{ height }}></div>
    );
}
