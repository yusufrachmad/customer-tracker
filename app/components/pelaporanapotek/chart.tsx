"use client";
import type { KunjunganPerTahun } from "@/app/pelaporanapotek/page";
import { useState, useRef, useMemo, useEffect } from "react";

export default function Chart({ perTahun }: { perTahun: KunjunganPerTahun[] }) {
  const lineChart = useRef<HTMLDivElement>(null);

  const draw = useMemo(
    () => () => {
      const data = new google.visualization.DataTable();
      const options = {
        curveType: "function",
        legend: { position: "bottom" },
        width: lineChart?.current?.offsetWidth || "100%",
        height: lineChart?.current?.offsetHeight || 200,
      };

      data.addColumn("string", "Bulan");
      data.addColumn("number", "Jumlah Kunjungan");

      perTahun.forEach((item) => {
        data.addRow([item.month, item.jumlah_kunjungan]);
      });

      const oData = google.visualization.arrayToDataTable(
        [["Bulan", "Jumlah Kunjungan"] as (string | number)[]].concat(
          perTahun.map((item) => {
            return [item.month, item.jumlah_kunjungan];
          })
        )
      );

      const chart = new google.visualization.LineChart(
        lineChart.current as HTMLElement
      );

      chart.draw(oData, options);

      const handleResize = () => {
        options.width = lineChart?.current?.offsetWidth || "100%";
        options.height = lineChart?.current?.offsetHeight || 200;
        chart.draw(oData, options);
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    },
    [perTahun]
  );

  useEffect(() => {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(draw);

    window.addEventListener("resize", draw);

    return () => window.removeEventListener("resize", draw);
  }, [draw]);

  return (
    <>
      <div ref={lineChart}></div>
    </>
  );
}
