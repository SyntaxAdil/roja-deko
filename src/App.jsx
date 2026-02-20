import { useEffect, useState } from "react";

const TimeBlock = ({ value, unit }) => (
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
);

const CountdownCard = ({ label, countdown }) => (
  <div className="relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#0f172a] border border-slate-800 rounded-2xl p-8 md:p-12 flex-1 ">
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
);

const App = () => {
  const [data, setData] = useState([]);
  const [sehriCountdown, setSehriCountdown] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [iftariCountdown, setIftariCountdown] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const apiKey = "qotSY9tHEDMCwCsj65SGSjCapiKhnXclgjKoDBFW2Ezg0xNg";
  const lat = "23.7908";
  const lon = "90.3507";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/api/v1/ramadan/?lat=${lat}&lon=${lon}&api_key=${apiKey}`,
      );
      const data = await res.json();
      setData(data.data.fasting);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const getCountdown = (timeStr, dateStr) => {
      const [h, m] = timeStr.split(":").map(Number);
      const target = new Date(dateStr);
      target.setHours(h, m, 0, 0);
      const now = new Date();
      if (target < now) target.setDate(target.getDate() + 1);
      const diff = target - now;
      return {
        hours: String(Math.floor(diff / 1000 / 3600)).padStart(2, "0"),
        minutes: String(Math.floor(((diff / 1000) % 3600) / 60)).padStart(
          2,
          "0",
        ),
        seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
      };
    };

    const interval = setInterval(() => {
      const now = new Date();

      const nextSehur = data.find((i) => {
        const [h, m] = i.time.sahur.split(":").map(Number);
        const t = new Date(i.date);
        t.setHours(h, m, 0, 0);
        return t > now;
      });
      if (nextSehur)
        setSehriCountdown(getCountdown(nextSehur.time.sahur, nextSehur.date));

      const nextIftar = data.find((i) => {
        const [h, m] = i.time.iftar.split(":").map(Number);
        const t = new Date(i.date);
        t.setHours(h, m, 0, 0);
        return t > now;
      });
      if (nextIftar)
        setIftariCountdown(getCountdown(nextIftar.time.iftar, nextIftar.date));
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const today = new Date().toLocaleDateString("en-CA");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=DM+Mono:wght@300;400;500&display=swap');
        body { background: #0a0e1a; font-family: 'DM Mono', monospace; color: #e8dcc8; }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center py-12">
          <p
            className="text-[#c9a96e] opacity-85 mb-1"
            style={{
              fontFamily: "Amiri, serif",
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
            }}
          >
            رمضان المبارك
          </p>
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-slate-500">
            Ramadan 1446 · Dhaka
          </p>
        </div>

        <div className="flex  flex-col md:flex-row   gap-4 mb-10 ">
          <CountdownCard
            label="Next Sehri Begins In"
            countdown={sehriCountdown}
          />
          <CountdownCard
            label="Next Iftari Begins In"
            countdown={iftariCountdown}
          />
        </div>

        <div className="bg-[#0d1117] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-800">
            <p className="text-[0.65rem] tracking-[0.3em] uppercase text-slate-500">
              Fasting Schedule
            </p>
          </div>
          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse"
              style={{ fontSize: "clamp(0.7rem, 2vw, 0.8rem)" }}
            >
              <thead>
                <tr className="bg-[#0f1923]">
                  {["Day", "Date", "Weekday", "Sehri", "Iftari"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-left text-[0.6rem] tracking-[0.25em] uppercase text-slate-600 font-normal whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((r, index) => {
                  const isToday = today === r.date;
                  return (
                    <tr
                      key={index}
                      className={`border-t transition-colors duration-150 ${
                        isToday
                          ? "border-[rgba(201,169,110,0.15)] bg-[rgba(201,169,110,0.07)] hover:bg-[rgba(201,169,110,0.1)]"
                          : "border-[#0f1923] hover:bg-[#111827]"
                      }`}
                    >
                      <td className="px-5 py-3 whitespace-nowrap">
                        <span
                          className={`tabular-nums text-[0.7rem] ${isToday ? "text-[#c9a96e]" : "text-slate-600"}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {isToday && (
                          <span className="ml-2 inline-block text-[0.5rem] tracking-[0.2em] uppercase bg-[rgba(201,169,110,0.15)] text-[#c9a96e] border border-[rgba(201,169,110,0.3)] rounded px-1.5 py-0.5 align-middle">
                            Today
                          </span>
                        )}
                      </td>
                      <td
                        className={`px-5 py-3 whitespace-nowrap ${isToday ? "text-[#e8dcc8]" : "text-slate-500"}`}
                      >
                        {r.date}
                      </td>
                      <td
                        className={`px-5 py-3 whitespace-nowrap ${isToday ? "text-[#e8dcc8]" : "text-slate-500"}`}
                      >
                        {r.day}
                      </td>
                      <td
                        className={`px-5 py-3 whitespace-nowrap tabular-nums ${isToday ? "text-[#a0946e]" : "text-slate-600"}`}
                      >
                        {r.time.sahur} AM
                      </td>
                      <td
                        className={`px-5 py-3 whitespace-nowrap tabular-nums ${isToday ? "text-[#a0946e]" : "text-slate-600"}`}
                      >
                        {r.time.iftar} PM
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center mt-20 select-none">
          &copy; All rights reserve. <b>Abdur Rahman Adil</b>
        </p>
      </div>
    </>
  );
};

export default App;
