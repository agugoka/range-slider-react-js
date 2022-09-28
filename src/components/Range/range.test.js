import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Range from "./range";

describe("Test Normal Range Component", () => {
  const options = [
    {
      fixedValues: false,
      min: 1,
      max: 100,
      values: [0, 100],
    },
  ];

  let inputMinValue;
  let outInputs;
  let sliderUI;
  let inputMaxValue;
  beforeEach(() => {
    render(<Range options={options} />);
    inputMinValue = screen.getByRole("input", {
      name: "Minimum Value",
    });
    sliderUI = screen.getByRole("slider", {
      name: "Slider UI",
    });
    inputMaxValue = screen.getByRole("input", {
      name: "Maximum Value",
    });
    outInputs = screen.getByRole("outInputs", {
      name: "Slider Container",
    });
  });

  test("The minimum value input exist in the document", () => {
    expect(inputMinValue).toBeInTheDocument();
  });
  test("The slider UI exist in the document", () => {
    expect(sliderUI).toBeInTheDocument();
  });
  test("The maximum value input exist in the document", () => {
    expect(inputMaxValue).toBeInTheDocument();
  });
  test("The minimum value input is equal to 1", () => {
    expect(inputMinValue).toHaveValue(options.min);
  });
  test("The maximum value input is equal to 100", () => {
    expect(inputMaxValue).toHaveValue(options.max);
  });
  test("Clear minimum value and click out of input, the value will return to its preset minimum", () => {
    userEvent.clear(inputMinValue);
    userEvent.click(outInputs);
    expect(inputMinValue).toHaveValue(options.min);
  });
  test("Clear maximum value and click out of input, the value will return to its preset minimum plus one", () => {
    userEvent.clear(inputMaxValue);
    userEvent.click(outInputs);
    expect(inputMaxValue).toHaveValue(2);
  });
  test("Insert in the minimum input a number less than the minimum, the value returned is the preset minimum", () => {
    userEvent.clear(inputMinValue);
    userEvent.type(inputMinValue, "-1");
    userEvent.click(outInputs);
    expect(inputMinValue).toHaveValue(options.min);
  });
  test("Insert in the maximum input a number greater than the maximum, the value returned is the preset maximum", () => {
    userEvent.clear(inputMaxValue);
    userEvent.type(inputMaxValue, "150");
    userEvent.click(outInputs);
    expect(inputMaxValue).toHaveValue(options.max);
  });
  test("Insert in the minimum input a number greater than the maximum, the value returned is the maximum value minus one", () => {
    userEvent.clear(inputMinValue);
    userEvent.type(inputMinValue, "110");
    userEvent.click(outInputs);
    expect(inputMinValue).toHaveValue(99);
  });
  test("Insert in the minimum input a number greater than the maximum, the value returned is the maximum value minus one", () => {
    userEvent.clear(inputMaxValue);
    userEvent.type(inputMaxValue, "69");
    userEvent.click(outInputs);
    userEvent.clear(inputMinValue);
    userEvent.type(inputMinValue, "75");
    userEvent.click(outInputs);
    expect(inputMinValue).toHaveValue(68);
  });
  test("Insert in the maximum input a number less than the minimum input value, the value returned is the minimum value plus one", () => {
    userEvent.clear(inputMinValue);
    userEvent.type(inputMinValue, "10");
    userEvent.click(outInputs);
    userEvent.clear(inputMaxValue);
    userEvent.type(inputMaxValue, "5");
    userEvent.click(outInputs);
    expect(inputMaxValue).toHaveValue(11);
  });
});

describe("Test Fixed Values Range Component", () => {
  const options = [
    {
      fixedValues: true,
      min: 1.99,
      max: 70.99,
      values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
    },
  ];

  let inputMinValue;
  let sliderUI;
  let inputMaxValue;
  beforeEach(() => {
    render(<Range options={options} />);
    inputMinValue = screen.getByRole("input", {
      name: "Minimum Value",
    });
    sliderUI = screen.getByRole("slider", {
      name: "Slider UI",
    });
    inputMaxValue = screen.getByRole("input", {
      name: "Maximum Value",
    });
  });

  test("The minimum value input exist in the document", () => {
    expect(inputMinValue).toBeInTheDocument();
  });
  test("The slider UI exist in the document", () => {
    expect(sliderUI).toBeInTheDocument();
  });
  test("The maximum value input exist in the document", () => {
    expect(inputMaxValue).toBeInTheDocument();
  });
  test("The minimum value input is equal to 1,99", () => {
    expect(inputMinValue).toHaveValue(options.min);
  });
  test("The maximum value input is equal to 70,99", () => {
    expect(inputMaxValue).toHaveValue(options.max);
  });
});
