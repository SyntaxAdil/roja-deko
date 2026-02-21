import { useEffect, useState } from "react";

import CountdownCard from "./components/CountdownCard";

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/ramadan.json");
      const json = await res.json();
      setData(json.data.fasting);
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
      <div className="max-w-240 mx-auto px-4 pb-16">
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
          <div className="overflow-x-auto ">
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
