"use client";
import type { KunjunganPerTahun } from "@/app/pelaporanapotek/page";
import { useState, useRef, useMemo, useEffect } from "react";

export default function Chart({ perTahun }: { perTahun: KunjunganPerTahun[] }) {
  const lineChart = useRef<HTMLDivElement>(null);

  const draw = useMemo(
    () => () => {
      const data = new google.visualization.DataTable();
      const options: google.visualization.LineChartOptions = {
        curveType: "function",
        legend: { position: "bottom" },
        width: 300,
        height: 200,
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
