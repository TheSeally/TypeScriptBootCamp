import React from 'react';
import { ChartColumnProps } from './App';

export function ChartColumn({ height }:  ChartColumnProps): React.ReactElement {
    return (
        <div className="chart__column" style={{ height }}></div>
    );
}
