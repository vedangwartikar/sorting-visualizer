import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const SORT_SPEED_MS = 1.5;
const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'grey';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const SORTED_COLOR = 'green';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 550));
    }
    this.setState({ array });
    for (let i = 0; i < this.state.array.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const barOneStyle = arrayBars[i].style;
      setTimeout(() => {
        barOneStyle.backgroundColor = PRIMARY_COLOR;
      }, i * ANIMATION_SPEED_MS)
    }
  }

  async mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    /* console.log(animations);
    console.log(this.state.array); */
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SORT_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * SORT_SPEED_MS);
      }
    }

    /* for (let i = 0; i < this.state.array.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const barOneStyle = arrayBars[i].style;
      setTimeout(() => {
        barOneStyle.backgroundColor = SORTED_COLOR;
      }, i * ANIMATION_SPEED_MS)
    } */

    //barOneStyle.backgroundColor = SORTED_COLOR;
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  sorted() {
    for (let i = 0; i < this.state.array.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const barOneStyle = arrayBars[i].style;
      setTimeout(() => {
        barOneStyle.backgroundColor = SORTED_COLOR;
      }, i * ANIMATION_SPEED_MS)
    }
  }
  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.

  /* testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  } */

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        <h1 class="text-slider-items">Sorting Visualizer</h1>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <br />
        <br />
        <button class="button" onClick={() => this.resetArray()}>Shuffle Array</button>
        <button class="btn button" onClick={() => this.mergeSort()}>Merge Sort</button>
        {/* <button class="btn button" onClick={() => this.mergeSort().then(() => this.sorted())}>Merge Sort</button> */}
        {/* <div>{() => this.sorted()}</div> */}
        <button class="btn button" onClick={() => this.sorted()}>Bubble Sort</button>
        {/* <div> {this.sorted()} </div> */}
        {/* <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button> */}
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
} */
