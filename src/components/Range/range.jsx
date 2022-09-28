import React, { useEffect, useState, useRef } from "react";
import { debounce } from "lodash";

const Range = ({ options }) => {
  const optionsRange = options[0] || null;

  const values = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

  const [step, setStep] = useState({
    min: 0,
    max: Number(values.length - 1),
  });

  const [state, setState] = useState({
    sliderWidth: 0,
    offsetSliderWidht: 0,
    // min: 1,
    // max: 100,
    minValueBetween: 0,

    min: Number(values[0]),
    currentMin: Number(values[0]),
    inputMin: Number(values[0]),
    max: Number(values[values.length - 1]),
    currentMax: Number(values[values.length - 1]),
    inputMax: Number(values[values.length - 1]),
    isFixedValues: true,
  });

  useEffect(() => {
    console.log("STATE currentMin", state.currentMin);
    console.log("STATE currentMax", state.currentMax);
    console.log("STep min", step.min);
    console.log("STep max", step.max);
  }, [state, step]);

  // NORMAL RANGE STATE
  // const [state, setState] = useState({
  //   sliderWidth: 0,
  //   offsetSliderWidht: 0,
  //   min: 1,
  //   max: 100,
  //   minValueBetween: 5,

  //   currentMin: 1,
  //   inputMin: 1,

  //   currentMax: 100,
  //   inputMax: 100,
  // });

  const sliderRef = useRef(null);
  const inputMinRef = useRef(null);
  const inputMaxRef = useRef(null);
  const minValueRef = useRef(null);
  const maxValueRef = useRef(null);
  const minValueDragRef = useRef(null);
  const maxValueDragRef = useRef(null);

  useEffect(() => {
    minValueRef.current.style.width =
      (state.currentMin * 100) / state.max + "%";
    maxValueRef.current.style.width =
      (state.currentMax * 100) / state.max + "%";
    setState({
      ...state,
      sliderWidth: sliderRef?.current.offsetWidth,
      offsetSliderWidht: sliderRef?.current.offsetLeft,
    });
  }, []);

  const onMouseMoveMin = (e) => {
    const dragedWidht = e.clientX - state.offsetSliderWidht;
    const dragedWidhtInPercent = (dragedWidht * 100) / state.sliderWidth;
    const currentMin = ~~((state.max * dragedWidhtInPercent) / 100);
    if (
      currentMin >= state.min &&
      currentMin <= state.currentMax - state.minValueBetween
    ) {
      minValueRef.current.style.width = dragedWidhtInPercent + "%";
      minValueRef.current.dataset.content = currentMin;
      setState({ ...state, currentMin, inputMin: currentMin });
      inputMinRef.current.value = currentMin;
    }
  };

  const onMouseMoveMinFixeds = (e) => {
    let currentStepMin = step.min;
    let nextStepMin = Number(step.min + 1);
    let dragedWidht = e.clientX - state.offsetSliderWidht;
    let dragedWidhtInPercent = (dragedWidht * 100) / state.sliderWidth;
    let currentMin = Number(
      ((state.max * dragedWidhtInPercent) / 100).toFixed(2)
    );

    console.log("currentMin", currentMin);

    const recursiveConditional = () => {
      if (currentMin > values[nextStepMin] && currentMin < values[step.max]) {
        currentStepMin = nextStepMin;
        nextStepMin = Number(currentStepMin + 1);
        minValueRef.current.style.width =
          (values[currentStepMin] * 100) / state.max + "%";
        minValueRef.current.dataset.content = values[currentStepMin];
        inputMinRef.current.value = values[currentStepMin];
        setStep({ ...step, min: currentStepMin });
        setState({
          ...state,
          currentMin: values[currentStepMin],
          inputMin: values[currentStepMin],
        });
        recursiveConditional();
      } else if (
        currentMin < values[currentStepMin] &&
        currentMin > values[0]
      ) {
        currentStepMin = currentStepMin - 1;
        nextStepMin = Number(currentStepMin + 1);
        minValueRef.current.style.width =
          (values[currentStepMin] * 100) / state.max + "%";
        minValueRef.current.dataset.content = values[currentStepMin];
        inputMinRef.current.value = values[currentStepMin];
        setStep({ ...step, min: currentStepMin });
        setState({
          ...state,
          currentMin: values[currentStepMin],
          inputMin: values[currentStepMin],
        });
        recursiveConditional();
      } else if (currentMin < values[0]) {
        currentStepMin = 0;
        nextStepMin = Number(currentStepMin + 1);
        minValueRef.current.style.width =
          (values[currentStepMin] * 100) / state.max + "%";
        minValueRef.current.dataset.content = values[currentStepMin];
        inputMinRef.current.value = values[currentStepMin];
        setStep({ ...step, min: currentStepMin });
        setState({
          ...state,
          currentMin: values[currentStepMin],
          inputMin: values[currentStepMin],
        });
      }
    };
    recursiveConditional();
  };

  const onMouseMoveMax = (e) => {
    const dragedWidht = e.clientX - state.offsetSliderWidht;
    const dragedWidhtInPercent = (dragedWidht * 100) / state.sliderWidth;
    const currentMax = ~~((state.max * dragedWidhtInPercent) / 100);
    if (
      currentMax >= state.currentMin + state.minValueBetween &&
      currentMax <= state.max
    ) {
      maxValueRef.current.style.width = dragedWidhtInPercent + "%";
      maxValueRef.current.dataset.content = currentMax;
      setState({
        ...state,
        currentMax,
        inputMax: currentMax,
      });
      inputMaxRef.current.value = currentMax;
    }
  };

  const onMouseMoveMaxFixeds = (e) => {
    let currentStepMax = step.max;
    let nextStepMax = Number(step.max - 1);
    let dragedWidht = e.clientX - state.offsetSliderWidht;
    let dragedWidhtInPercent = (dragedWidht * 100) / state.sliderWidth;
    let currentMax = Number(
      ((state.max * dragedWidhtInPercent) / 100).toFixed(2)
    );

    console.log("currentMax", currentMax);

    const recursiveConditional = () => {
      if (currentMax < values[nextStepMax] && currentMax > values[step.min]) {
        currentStepMax = nextStepMax;
        nextStepMax = currentStepMax - 1;
        maxValueRef.current.style.width =
          (values[currentStepMax] * 100) / state.max + "%";
        maxValueRef.current.dataset.content = values[currentStepMax];
        inputMaxRef.current.value = values[currentStepMax];
        setStep({ ...step, max: currentStepMax });
        setState({
          ...state,
          currentMax: values[currentStepMax],
          inputMax: values[currentStepMax],
        });
        recursiveConditional();
      } else if (
        currentMax > values[currentStepMax] &&
        currentMax < values[values.length - 1]
      ) {
        currentStepMax = currentStepMax + 1;
        nextStepMax = currentStepMax + 1;
        maxValueRef.current.style.width =
          (values[currentStepMax] * 100) / state.max + "%";
        maxValueRef.current.dataset.content = values[currentStepMax];
        inputMaxRef.current.value = values[currentStepMax];
        setStep({ ...step, max: currentStepMax });
        setState({
          ...state,
          currentMax: values[currentStepMax],
          inputMax: values[currentStepMax],
        });
        recursiveConditional();
      } else if (currentMax > values[values.length - 1]) {
        currentStepMax = values.length - 1;
        nextStepMax = currentStepMax - 1;
        maxValueRef.current.style.width =
          (values[currentStepMax] * 100) / state.max + "%";
        maxValueRef.current.dataset.content = values[currentStepMax];
        inputMaxRef.current.value = values[currentStepMax];
        setStep({ ...step, max: currentStepMax });
        setState({
          ...state,
          currentMax: values[currentStepMax],
          inputMax: values[currentStepMax],
        });
      }
    };
    recursiveConditional();
  };

  const onMouseUpMin = () => {
    document.removeEventListener(
      "mousemove",
      !state.isFixedValues ? onMouseMoveMin : onMouseMoveMinFixeds
    );
    document.removeEventListener("mouseup", onMouseUpMin);
    document.removeEventListener(
      "touchmove",
      !state.isFixedValues ? onMouseMoveMin : onMouseMoveMinFixeds
    );
    document.removeEventListener("touchend", onMouseUpMin);
  };
  const onMouseUpMax = () => {
    document.removeEventListener(
      "mousemove",
      !state.isFixedValues ? onMouseMoveMax : onMouseMoveMaxFixeds
    );
    document.removeEventListener("mouseup", onMouseUpMax);
    document.removeEventListener(
      "touchmove",
      !state.isFixedValues ? onMouseMoveMax : onMouseMoveMaxFixeds
    );
    document.removeEventListener("touchend", onMouseUpMax);
  };
  const changeMinValue = (e) => {
    e.preventDefault();
    document.addEventListener(
      "mousemove",
      !state.isFixedValues ? onMouseMoveMin : onMouseMoveMinFixeds
    );
    document.addEventListener("mouseup", onMouseUpMin);
    document.addEventListener(
      "touchmove",
      !state.isFixedValues ? onMouseMoveMin : onMouseMoveMinFixeds
    );
    document.addEventListener("touchend", onMouseUpMin);
  };
  const changeMaxValue = (e) => {
    e.preventDefault();
    document.addEventListener(
      "mousemove",
      !state.isFixedValues ? onMouseMoveMax : onMouseMoveMaxFixeds
    );
    document.addEventListener("mouseup", onMouseUpMax);
    document.addEventListener(
      "touchmove",
      !state.isFixedValues ? onMouseMoveMax : onMouseMoveMaxFixeds
    );
    document.addEventListener("touchend", onMouseUpMax);
  };

  const setMin = debounce((e) => {
    const inputMin = e.target.value;
    setState({
      ...state,
      inputMin,
    });
    if (
      inputMin >= state.min &&
      inputMin <= state.currentMax - state.minValueBetween
    ) {
      setState({ ...state, currentMin: ~~inputMin });
      minValueRef.current.style.width = (inputMin * 100) / state.max + "%";
      inputMinRef.current.value = inputMin;
    } else if (inputMin <= state.min) {
      setState({ ...state, currentMin: ~~state.min });
      minValueRef.current.style.width = (state.min * 100) / state.max + "%";
      inputMinRef.current.value = state.min;
    } else if (inputMin >= state.currentMax) {
      console.log("inputMin >= state.max || inputMin >= state.currentMax");
      setState({
        ...state,
        currentMin: ~~state.currentMax - state.minValueBetween,
      });
      minValueRef.current.style.width =
        ((~~state.currentMax - state.minValueBetween) * 100) / state.max + "%";
      inputMinRef.current.value = state.currentMax - state.minValueBetween;
    }
    inputMinRef.current.blur();
  }, 400);

  const setMax = debounce((e) => {
    const inputMax = e.target.value;
    setState({ ...state, inputMax });
    if (
      inputMax >= state.currentMin + state.minValueBetween &&
      inputMax <= state.max
    ) {
      setState({ ...state, currentMax: ~~inputMax });
      maxValueRef.current.style.width = (inputMax * 100) / state.max + "%";
      inputMaxRef.current.value = inputMax;
    } else if (inputMax <= state.min || inputMax <= state.currentMin) {
      setState({
        ...state,
        currentMax: state.currentMin + state.minValueBetween,
      });
      maxValueRef.current.style.width =
        ((state.currentMin + state.minValueBetween) * 100) / state.max + "%";
      inputMaxRef.current.value = state.currentMin + state.minValueBetween;
    } else if (inputMax >= state.max) {
      maxValueRef.current.style.width = (state.max * 100) / state.max + "%";
      inputMaxRef.current.value = state.max;
    }
    inputMaxRef.current.blur();
  }, 400);

  const maxForMin = () => {
    return state.currentMax - state.minValueBetween;
  };
  const minForMax = () => {
    return state.currentMin + state.minValueBetween;
  };

  const _handleFocus = (e) => e.target.select();

  return (
    <div className="slider_container_elements">
      <div className="input">
        <input
          ref={inputMinRef}
          id="min-input"
          type="number"
          defaultValue={state.inputMin}
          min={state.min}
          max={maxForMin()}
          onChange={(e) => setMin(e)}
          onFocus={_handleFocus}
          disabled={state.isFixedValues}
        />
        <span></span>
      </div>
      <div
        className="slider_container"
        role="outInputs"
        title="Slider Container">
        <div ref={sliderRef} id="slider">
          <div ref={minValueRef} id="min" data-content={state.currentMin}>
            <div
              ref={minValueDragRef}
              id="min-drag"
              onMouseDown={(e) => changeMinValue(e)}
              onTouchStart={(e) => changeMinValue(e)}></div>
          </div>
          <div ref={maxValueRef} id="max" data-content={state.currentMax}>
            <div
              ref={maxValueDragRef}
              id="max-drag"
              onMouseDown={(e) => changeMaxValue(e)}
              onTouchStart={(e) => changeMaxValue(e)}></div>
          </div>
        </div>
      </div>
      <div className="input">
        <input
          ref={inputMaxRef}
          id="max-input"
          type="number"
          defaultValue={state.inputMax}
          min={minForMax()}
          max={state.max}
          onChange={(e) => setMax(e)}
          onFocus={_handleFocus}
          disabled={state.isFixedValues}
        />
        <span></span>
      </div>
    </div>
  );
};

export default Range;
