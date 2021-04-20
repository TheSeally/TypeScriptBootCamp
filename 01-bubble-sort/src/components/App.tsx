import React from 'react';

import './App.css';
import { ChartColumn } from './ChartColumn';

import { MIN_SIZE, DEFAULT_SIZE, SORT_SPEED, SortStatuses } from '../constants';

import { SortingService } from '../services/sortingservice';
import { generateRandomData } from '../services/datagenerator';

export interface ChartColumnProps {
  height: number,
}

interface AppState {
  size: number,
  data: number[],
  status: string,
}

export default class App extends React.Component<{}, AppState> {
  state = {
    size: DEFAULT_SIZE,
    data: generateRandomData(DEFAULT_SIZE),
    status: SortStatuses.notStarted,
  };
  // FIXME: should be replaced by interface type
  private sortingService: SortingService = new SortingService(this.state.data);
  private timerId: number = 0;

  changeSize = (event: React.ChangeEvent<HTMLInputElement>): void => {
    clearInterval(this.timerId);
    const size = Number(event.target.value) || MIN_SIZE;

    if (size !== this.state.size) {
      this.setState({ size, data: generateRandomData(size), status: SortStatuses.notStarted }, () => {
        this.sortingService = new SortingService(this.state.data)
      });
    }
  };

  startSorting = (): void => {
    this.setState({ status: SortStatuses.started });

    this.timerId = window.setInterval(() => {
      this.setState({ data: this.sortingService.step() });

      if (this.sortingService.isSortingComplete()) {
        clearInterval(this.timerId);
        this.setState({ status: SortStatuses.completed })
      }
    }, SORT_SPEED);
  };

  stopSorting = (): void => {
    clearInterval(this.timerId);
    this.setState({ status: SortStatuses.paused })
  };

  render(): React.ReactNode {
    return (
      <main className="container">
        <div className="container__title">Bubble sorting</div>

        <section className="container__item chart">
          {/* FIXME: create better mechanism for generating  unique key */}
          {this.state.data.map((value, index) => <ChartColumn height={value} key={Math.pow(value, index)} />)}
        </section>

        <div className="container__status">{this.state.status}</div>

        {/* TODO separate into component */}
        <section className="container__item controller">
          <button className="controller__item" onClick={this.stopSorting}>Stop</button>

          <input
            type="text"
            className="controller__input controller__item"
            value={this.state.size}
            onChange={this.changeSize}
          />

          <button className="controller__item" onClick={this.startSorting}>Start</button>
        </section>
      </main>
    );
  }
}
