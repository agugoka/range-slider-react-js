import React, { useEffect } from "react";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

const Range = ({ options }) => {
  const optionsRange = options[0] || null;

  useEffect(() => {
    if (optionsRange) {
      if (!optionsRange?.fixedValues) {
        const minOpt = optionsRange?.min;
        const maxOpt = optionsRange?.max;
        $("#slider-range").slider({
          range: true,
          min: minOpt,
          max: maxOpt,
          values: optionsRange?.values,
          slide: function (event, ui) {
            $("#minValue").val(ui.values[0]);
            $("#maxValue").val(ui.values[1]);
          },
        });
        $("#minValue").val($("#slider-range").slider("values", 0));
        $("#maxValue").val($("#slider-range").slider("values", 1));
        $("#minValue").on("change", function () {
          if ($("#minValue").val() < minOpt) {
            $("#minValue").val(minOpt);
            $("#slider-range").slider("values", 0, minOpt);
          } else if (
            ~~$("#minValue").val() >= maxOpt ||
            ~~$("#minValue").val() > ~~$("#maxValue").val()
          ) {
            $("#minValue").val(~~$("#maxValue").val() - 1);
            $("#slider-range").slider("values", 0, ~~$("#maxValue").val() - 1);
          } else {
            $("#minValue").val(~~$(this).val());
            $("#slider-range").slider("values", 0, ~~$(this).val());
          }
        });
        $("#maxValue").on("change", function () {
          if (~~$("#maxValue").val() >= maxOpt) {
            ~~$("#maxValue").val(maxOpt);
            $("#slider-range").slider("values", 1, maxOpt);
          } else if (~~$("#maxValue").val() <= ~~$("#minValue").val()) {
            $("#maxValue").val(~~$("#minValue").val() + 1);
            $("#slider-range").slider("values", 1, ~~$("#minValue").val() + 1);
          } else {
            $("#maxValue").val(~~$(this).val());
            $("#slider-range").slider("values", 1, ~~$(this).val());
          }
        });
      } else {
        const valuesArr = optionsRange?.values;
        $("#slider-range").slider({
          range: true,
          min: 0,
          max: valuesArr.length - 1,
          values: [0, valuesArr[~~(valuesArr.length - 1)]],
          create: function (event, ui) {
            $("#minValue").val(valuesArr[0]);
            $("#maxValue").val(valuesArr[~~(valuesArr.length - 1)]);
          },
          slide: function (event, ui) {
            if (ui.handleIndex == 0) {
              $("#minValue").val(valuesArr[ui.value]);
            }
            if (ui.handleIndex == 1) {
              $("#maxValue").val(valuesArr[ui.value]);
            }
          },
        });
      }
    }
  }, [options]);

  return (
    <div className="slider_container_elements">
      <div className="input">
        <input
          id="minValue"
          type="number"
          min={optionsRange?.min}
          max={optionsRange?.max}
          disabled={optionsRange?.fixedValues}
          role="input"
          title="Minimum Value"
        />
        <span></span>
      </div>
      <div className="slider_container"
          role="outInputs"
          title="Slider Container">
        <div id="slider-range" role="slider" title="Slider UI"></div>
      </div>
      <div className="input">
        <input
          id="maxValue"
          type="number"
          min={optionsRange?.min}
          max={optionsRange?.max}
          disabled={optionsRange?.fixedValues}
          role="input"
          title="Maximum Value"
        />
        <span></span>
      </div>
    </div>
  );
};

export default Range;






