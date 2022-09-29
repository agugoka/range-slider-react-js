import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
// import { act } from 'react-dom/test-utils';
import userEvent from "@testing-library/user-event";
import Range from "./range";

describe("Test Normal Range Component", () => {
  const options = [
    {
      values: [1, 100],
      minValueBetween: 10,
    },
  ];

  let inputMinValue;
  let inputMaxValue;
  let sliderRange;
  let sliderDragMin;
  let sliderDragMax;
  beforeEach(() => {
    render(<Range options={options} />);
    inputMinValue = screen.getByRole("input", {
      name: "Minimum Value",
    });
    inputMaxValue = screen.getByRole("input", {
      name: "Maximum Value",
    });
    sliderRange = screen.getByRole("slider", {
      name: "Slider Range",
    });
    sliderDragMin = screen.getByRole("dragMin", {
      name: "Drag Minimun Value",
    });
    sliderDragMax = screen.getByRole("dragMax", {
      name: "Drag Maximun Value",
    });
  });

  test("The minimum value input exist in the document", () => {
    expect(inputMinValue).toBeInTheDocument();
  });
  test("The maximum value input exist in the document", () => {
    expect(inputMaxValue).toBeInTheDocument();
  });
  test("The slider Range exist in the document", () => {
    expect(sliderRange).toBeInTheDocument();
  });
  test("The drag minimun value of slider range exist in the document", () => {
    expect(sliderDragMin).toBeInTheDocument();
  });
  test("The drag maximun value of slider range exist in the document", () => {
    expect(sliderDragMax).toBeInTheDocument();
  });

  test("The minimum value input is equal to the minimum value of array options values", () => {
    expect(inputMinValue).toHaveValue(options.values[0]);
  });
  test("The maximum value input is equal to the maximum value of array options values", () => {
    expect(inputMaxValue).toHaveValue(
      options.values[options.values.length - 1]
    );
  });
  test("Clear minimum value, the value will return is equal to the minimum value of array options values", async () => {
    userEvent.clear(inputMinValue);
    await new Promise((r) => setTimeout(r, 410));
    expect(inputMinValue).toHaveValue(options.values[0]);
  });
  test("Insert in the minimum input a number less than the minimum, the value returned is the preset minimum", async () => {
    userEvent.clear(inputMinValue);
    userEvent.type(inputMinValue, "-1");
    await new Promise((r) => setTimeout(r, 410));
    expect(inputMinValue).toHaveValue(options.values[0]);
  });
  test("Insert in the maximum input a number greater than the maximum, the value returned is the preset maximum", async () => {
    userEvent.clear(inputMaxValue);
    userEvent.type(inputMaxValue, "150");
    await new Promise((r) => setTimeout(r, 410));
    expect(inputMaxValue).toHaveValue(
      options.values[options.values.length - 1]
    );
  });
});

describe("Test Fixed Values Range Component", () => {
  const options = [
    {
      values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
      minValueBetween: 1,
    },
  ];

  let inputMinValue;
  let inputMaxValue;
  let sliderRange;
  let sliderDragMin;
  let sliderDragMax;
  beforeEach(() => {
    render(<Range options={options} />);
    inputMinValue = screen.getByRole("input", {
      name: "Minimum Value",
    });
    inputMaxValue = screen.getByRole("input", {
      name: "Maximum Value",
    });
    sliderRange = screen.getByRole("slider", {
      name: "Slider Range",
    });
    sliderDragMin = screen.getByRole("dragMin", {
      name: "Drag Minimun Value",
    });
    sliderDragMax = screen.getByRole("dragMax", {
      name: "Drag Maximun Value",
    });
  });

  test("The minimum value input exist in the document", () => {
    expect(inputMinValue).toBeInTheDocument();
  });
  test("The maximum value input exist in the document", () => {
    expect(inputMaxValue).toBeInTheDocument();
  });
  test("The slider Range exist in the document", () => {
    expect(sliderRange).toBeInTheDocument();
  });
  test("The drag minimun value of slider range exist in the document", () => {
    expect(sliderDragMin).toBeInTheDocument();
  });
  test("The drag maximun value of slider range exist in the document", () => {
    expect(sliderDragMax).toBeInTheDocument();
  });

  test("The minimum value input is equal to the minimum value of array options values", () => {
    expect(inputMinValue).toHaveValue(options.values[0]);
  });
  test("The maximum value input is equal to the maximum value of array options values", () => {
    expect(inputMaxValue).toHaveValue(
      options.values[options.values.length - 1]
    );
  });
});
