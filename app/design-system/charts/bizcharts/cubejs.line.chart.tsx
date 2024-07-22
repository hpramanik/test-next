import { type ResultSet } from "@cubejs-client/core";
import { Axis, Chart, Geom, Tooltip } from "bizcharts";

export const BizLineChart = ({
  data,
}: Readonly<{ data: ResultSet }>): React.ReactElement => {
  return (
    <Chart
      scale={{
        x: {
          tickCount: 8,
        },
      }}
      autoFit
      height={400}
      data={data}
      forceFit
    >
      <Axis name="x" />
      <Axis name="measure" />
      <Tooltip
        crosshairs={{
          type: "y",
        }}
      />
      <Geom type="line" position="x*measure" size={2} color="color" />
    </Chart>
  );
};
