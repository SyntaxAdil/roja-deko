import React from "react";

const TimeBlock = ({ value, unit }) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-2 ">
        <span
          className="font-mono font-light leading-none  text-center"
          style={{
            fontSize: "clamp(2.8rem, 10vw, 5.5rem)",
            background: "linear-gradient(180deg, #f0e6d3 0%, #c9a96e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {value}
        </span>
        <span className="text-[0.55rem] tracking-[0.25em] uppercase text-slate-600">
          {unit}
        </span>
      </div>
    </div>
  );
};

export default TimeBlock;
