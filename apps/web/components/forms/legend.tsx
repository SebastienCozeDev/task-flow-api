"use client";

type LegendData = {
  title: string;
}

export default function Legend(data: LegendData) {
  return (
    <legend className="fieldset-legend">{data.title}</legend>
  );
}
