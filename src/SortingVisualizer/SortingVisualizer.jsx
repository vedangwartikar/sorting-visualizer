import React from 'react';
import { getMergeSortAnimations, getBubbleSortAnimations, getInsertionSortAnimations, getSelectionSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const SORT_SPEED_MS = 1.5;
const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
/* var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var element = document.getElementById('text');
if (isMobile) {
  element.innerHTML = "You are using Mobile";
} else {
  element.innerHTML = "You are using Desktop";
} */

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
      array.push(randomIntFromInterval(25, 475));
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

  // Animation to swap

  animationHelper(animations, speed = SORT_SPEED_MS) {
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIndex, barTwoIndex] = animations[i];
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      if (i % 2 === 0) {
        setTimeout(() => {
          animations.pop();
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
          let tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, (i + 1) * speed);
      }
      else {
        setTimeout(() => {
          animations.pop();
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, (i + 1) * speed);
      }
    }
  }

  postAnimation() {
    setTimeout(() => {
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < this.state.array.length; i++) {
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = SORTED_COLOR;
          //document.getElementsByClassName("bar-section")[0].style.boxShadow = "inset 0px 5px 6px 7px green";
        }, i * 10);
      }

      /* setTimeout(() => {
        for (let i = 0; i < this.state.array.length; i++) {
          arrayBars[i].style.backgroundColor = "#20232a";
        }
        document.getElementsByClassName("bar-section")[0].style.boxShadow = "inset 0px 5px 6px 7px #20232a";
        this.enableButtons();
      }, (this.state.array.length * 10) + 1000);
    }, (length + 1) * speedF + 1000); */
    })
  }

  //Merge sort 

  mergeSort() {
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


  bubbleSort() {
    // this.disableButtons();
    setTimeout(() => {
      const animations = getBubbleSortAnimations(this.state.array);
      this.animationHelper(animations);
    });
    return;
  }

  insertionSort() {
    setTimeout(() => {
      const animations = getInsertionSortAnimations(this.state.array);
      this.animationHelper(animations);
    });
  }

  selectionSort() {
    setTimeout(() => {
      const animations = getSelectionSortAnimations(this.state.array);
      this.animationHelper(animations, 30);
    });
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }


  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }
  return;

  sorted() {
    for (let i = 0; i < this.state.array.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const barOneStyle = arrayBars[i].style;
      setTimeout(() => {
        barOneStyle.backgroundColor = SORTED_COLOR;
      }, i * ANIMATION_SPEED_MS)
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        <h1>Sorting Visualizer</h1>
        <div className="dev">
          <h2>Still in development...</h2>
        </div>
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
        <div className="buttons">
          <button class="button" onClick={() => this.resetArray()}>Shuffle Array</button>
          <button class="btn button" onClick={() => this.mergeSort()}>Merge Sort</button>
          {/* <button class="btn button" onClick={() => this.mergeSort().then(() => this.sorted())}>Merge Sort</button> */}
          {/* <div>{() => this.sorted()}</div> */}
          <button class="btn button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button class="btn button" onClick={() => this.insertionSort()}>Insertion Sort</button>
          <button class="btn button" onClick={() => this.selectionSort()}>Selection Sort</button>
          {/* <div> {this.sorted()} </div> */}
          {/* <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button> */}
          <button class="btn button" onClick={() => this.sorted()}>Sorted</button>
        </div>
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
