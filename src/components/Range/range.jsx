import React, { useEffect, useState, useRef } from "react";
import { debounce } from "lodash";

const Range = ({ options }) => {
  const optionsRange = options[0] || null;

  const [reload, setReload] = useState(false);
  const [step, setStep] = useState({
    min: 0,
    max: 10,
  });
  const [state, setState] = useState({
    sliderWidth: 0,
    offsetSliderWidht: 0,
    minValueBetween: 0,
    min: 1,
    values: [1, 100],
    currentMin: 1,
    inputMin: 1,
    max: 100,
    currentMax: 100,
    inputMax: 100,
  });

  useEffect(() => {
    const isFixedValues = optionsRange?.values.length > 2;
    setStep({ ...step, min: 0, max: optionsRange?.values.length - 1 });
    setState({
      ...state,
      values: optionsRange?.values,
      min: optionsRange?.values[0],
      currentMin: optionsRange?.values[0],
      inputMin: optionsRange?.values[0],
      max: isFixedValues
        ? optionsRange?.values[optionsRange?.values.length - 1]
        : optionsRange?.values[1],
      currentMax: isFixedValues
        ? optionsRange?.values[optionsRange?.values.length - 1]
        : optionsRange?.values[1],
      inputMax: isFixedValues
        ? optionsRange?.values[optionsRange?.values.length - 1]
        : optionsRange?.values[1],
      minValueBetween: optionsRange?.minValueBetween,
    });
    setReload(true);
  }, [options]);

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

  const sliderRef = useRef(null);
  const inputMinRef = useRef(null);
  const inputMaxRef = useRef(null);
  const minValueRef = useRef(null);
  const maxValueRef = useRef(null);
  const minValueDragRef = useRef(null);
  const maxValueDragRef = useRef(null);

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
    const recursiveConditional = () => {
      if (
        currentMin > state.values[nextStepMin] &&
        currentMin < state.values[step.max]
      ) {
        currentStepMin = nextStepMin;
        nextStepMin = Number(currentStepMin + 1);
        minValueRef.current.style.width =
          (state.values[currentStepMin] * 100) / state.max + "%";
        minValueRef.current.dataset.content = state.values[currentStepMin];
        inputMinRef.current.value = state.values[currentStepMin];
        setStep({ ...step, min: currentStepMin });
        setState({
          ...state,
          currentMin: state.values[currentStepMin],
          inputMin: state.values[currentStepMin],
        });
        recursiveConditional();
      } else if (
        currentMin < state.values[currentStepMin] &&
        currentMin > state.values[0]
      ) {
        currentStepMin = currentStepMin - 1;
        nextStepMin = Number(currentStepMin + 1);
        minValueRef.current.style.width =
          (state.values[currentStepMin] * 100) / state.max + "%";
        minValueRef.current.dataset.content = state.values[currentStepMin];
        inputMinRef.current.value = state.values[currentStepMin];
        setStep({ ...step, min: currentStepMin });
        setState({
          ...state,
          currentMin: state.values[currentStepMin],
          inputMin: state.values[currentStepMin],
        });
        recursiveConditional();
      } else if (currentMin < state.values[0]) {
        currentStepMin = 0;
        nextStepMin = Number(currentStepMin + 1);
        minValueRef.current.style.width =
          (state.values[currentStepMin] * 100) / state.max + "%";
        minValueRef.current.dataset.content = state.values[currentStepMin];
        inputMinRef.current.value = state.values[currentStepMin];
        setStep({ ...step, min: currentStepMin });
        setState({
          ...state,
          currentMin: state.values[currentStepMin],
          inputMin: state.values[currentStepMin],
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
    const recursiveConditional = () => {
      if (
        currentMax < state.values[nextStepMax] &&
        currentMax > state.values[step.min]
      ) {
        currentStepMax = nextStepMax;
        nextStepMax = currentStepMax - 1;
        maxValueRef.current.style.width =
          (state.values[currentStepMax] * 100) / state.max + "%";
        maxValueRef.current.dataset.content = state.values[currentStepMax];
        inputMaxRef.current.value = state.values[currentStepMax];
        setStep({ ...step, max: currentStepMax });
        setState({
          ...state,
          currentMax: state.values[currentStepMax],
          inputMax: state.values[currentStepMax],
        });
        recursiveConditional();
      } else if (
        currentMax > state.values[currentStepMax] &&
        currentMax < state.values[state.values.length - 1]
      ) {
        currentStepMax = currentStepMax + 1;
        nextStepMax = currentStepMax + 1;
        maxValueRef.current.style.width =
          (state.values[currentStepMax] * 100) / state.max + "%";
        maxValueRef.current.dataset.content = state.values[currentStepMax];
        inputMaxRef.current.value = state.values[currentStepMax];
        setStep({ ...step, max: currentStepMax });
        setState({
          ...state,
          currentMax: state.values[currentStepMax],
          inputMax: state.values[currentStepMax],
        });
        recursiveConditional();
      } else if (currentMax > state.values[state.values.length - 1]) {
        currentStepMax = state.values.length - 1;
        nextStepMax = currentStepMax - 1;
        maxValueRef.current.style.width =
          (state.values[currentStepMax] * 100) / state.max + "%";
        maxValueRef.current.dataset.content = state.values[currentStepMax];
        inputMaxRef.current.value = state.values[currentStepMax];
        setStep({ ...step, max: currentStepMax });
        setState({
          ...state,
          currentMax: state.values[currentStepMax],
          inputMax: state.values[currentStepMax],
        });
      }
    };
    recursiveConditional();
  };

  const onMouseUpMin = () => {
    const isFixedValues = optionsRange?.values.length > 2;
    inputMinRef.current.className = "";
    document.removeEventListener(
      "mousemove",
      !isFixedValues ? onMouseMoveMin : onMouseMoveMinFixeds
    );
    document.removeEventListener("mouseup", onMouseUpMin);
    document.removeEventListener(
      "touchmove",
      !isFixedValues ? onMouseMoveMin : onMouseMoveMinFixeds
    );
    document.removeEventListener("touchend", onMouseUpMin);
  };
  const onMouseUpMax = () => {
    const isFixedValues = optionsRange?.values.length > 2;
    inputMaxRef.current.className = "";
    document.removeEventListener(
      "mousemove",
      !isFixedValues ? onMouseMoveMax : onMouseMoveMaxFixeds
    );
    document.removeEventListener("mouseup", onMouseUpMax);
    document.removeEventListener(
      "touchmove",
      !isFixedValues ? onMouseMoveMax : onMouseMoveMaxFixeds
    );
    document.removeEventListener("touchend", onMouseUpMax);
  };
  const changeMinValue = (e) => {
    const isFixedValues = optionsRange?.values.length > 2;
    inputMinRef.current.className = "font400";
    e.preventDefault();
    document.addEventListener(
      "mousemove",
      !isFixedValues ? onMouseMoveMin : onMouseMoveMinFixeds
    );
    document.addEventListener("mouseup", onMouseUpMin);
    document.addEventListener(
      "touchmove",
      !isFixedValues ? onMouseMoveMin : onMouseMoveMinFixeds
    );
    document.addEventListener("touchend", onMouseUpMin);
  };
  const changeMaxValue = (e) => {
    const isFixedValues = optionsRange?.values.length > 2;
    inputMaxRef.current.className = "font400";
    e.preventDefault();
    document.addEventListener(
      "mousemove",
      !isFixedValues ? onMouseMoveMax : onMouseMoveMaxFixeds
    );
    document.addEventListener("mouseup", onMouseUpMax);
    document.addEventListener(
      "touchmove",
      !isFixedValues ? onMouseMoveMax : onMouseMoveMaxFixeds
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
      inputMin > state.min &&
      inputMin < state.currentMax - state.minValueBetween
    ) {
      minValueRef.current.style.width = (inputMin * 100) / state.max + "%";
      inputMinRef.current.value = inputMin;
      setState({ ...state, currentMin: ~~inputMin });
    } else if (inputMin < state.min) {
      minValueRef.current.style.width = (state.min * 100) / state.max + "%";
      inputMinRef.current.value = state.min;
      setState({ ...state, currentMin: state.min });
    } else if (inputMin > state.currentMax - state.minValueBetween) {
      minValueRef.current.style.width =
        ((state.currentMax - state.minValueBetween) * 100) / state.max + "%";
      inputMinRef.current.value = state.currentMax - state.minValueBetween;
      setState({
        ...state,
        currentMin: Number(state.currentMax - state.minValueBetween),
      });
    }
    inputMinRef.current.blur();
  }, 400);

  const setMax = debounce((e) => {
    const inputMax = e.target.value;
    setState({ ...state, inputMax });
    if (
      inputMax < state.max &&
      inputMax > Number(state.currentMin + state.minValueBetween)
    ) {
      maxValueRef.current.style.width = (inputMax * 100) / state.max + "%";
      inputMaxRef.current.value = inputMax;
      setState({ ...state, currentMax: inputMax });
    } else if (inputMax > state.max) {
      maxValueRef.current.style.width = (state.max * 100) / state.max + "%";
      inputMaxRef.current.value = state.max;
      setState({
        ...state,
        currentMax: state.max,
      });
    } else if (inputMax < Number(state.currentMin + state.minValueBetween)) {
      maxValueRef.current.style.width =
        (Number(state.currentMin + state.minValueBetween) * 100) / state.max +
        "%";
      inputMaxRef.current.value = Number(
        state.currentMin + state.minValueBetween
      );
      setState({
        ...state,
        currentMax: Number(state.currentMin + state.minValueBetween),
      });
    }
    inputMaxRef.current.blur();
  }, 400);

  const _handleFocus = (e) => e.target.select();

  return (
    <div className="slider_container_elements">
      <div className="input">
        <input
          ref={inputMinRef}
          id="min-input"
          type="number"
          defaultValue={reload ? state.inputMin : undefined}
          onChange={(e) => setMin(e)}
          onFocus={_handleFocus}
          disabled={optionsRange?.values.length > 2}
        />
        <span></span>
      </div>
      <div
        className="slider_container"
        role="outInputs"
        title="Slider Container">
        <div ref={sliderRef} id="slider">
          <div
            ref={minValueRef}
            id="min"
            data-content={reload ? state.currentMin : undefined}>
            <div
              ref={minValueDragRef}
              id="min-drag"
              onMouseDown={(e) => changeMinValue(e)}
              onTouchStart={(e) => changeMinValue(e)}></div>
          </div>
          <div
            ref={maxValueRef}
            id="max"
            data-content={reload ? state.currentMax : undefined}>
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
          defaultValue={reload ? state.inputMax : undefined}
          onChange={(e) => setMax(e)}
          onFocus={_handleFocus}
          disabled={optionsRange?.values.length > 2}
        />
        <span></span>
      </div>
    </div>
  );
};

export default Range;
