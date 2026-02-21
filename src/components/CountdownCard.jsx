import React from 'react'
import TimeBlock from "./TimeBlock";

const CountdownCard =  ({ label, countdown }) => {
  return (
    <div>
      <div className="relative overflow-hidden bg-linear-to-br from-[#111827] to-[#0f172a] border border-slate-800 rounded-2xl p-8 md:p-12 flex-1 ">
          <div
            className="absolute -top-14 -right-14 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
            }}
          />
          <p className="text-center text-[0.65rem] tracking-[0.3em] uppercase text-[#c9a96e] mb-7">
            {label}
          </p>
          <div className="flex justify-center items-center gap-3  ">
            <TimeBlock value={countdown.hours} unit="Hours" />
            <span className="text-slate-700 font-light mb-5">:</span>
            <TimeBlock value={countdown.minutes} unit="Minutes" />
            <span className="text-slate-700 font-light mb-5">:</span>
            <TimeBlock value={countdown.seconds} unit="Seconds" />
          </div>
          <p className="text-center mt-7 tracking-[0.5em] opacity-40">· · ☽ · ·</p>
        </div>
    </div>
  )
}

export default CountdownCard
