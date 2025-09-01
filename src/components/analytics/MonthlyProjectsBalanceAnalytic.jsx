import React, { useState, useMemo, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Eye, EyeOff } from "lucide-react";
import cardStyles from "../../styles/analytics/analyticCard.module.css";
import styles from "../../styles/analytics/monthlyProjectsBalanceAnalytic.module.css";
import useGetMonthlyProjectsBalance from "../../hooks/analytics/useGetMonthlyProjectsBalance";
import { selectMonthlyBalanceDataAnalytic } from "../../features/analytics/AnalyticSelector";
import { useSelector } from "react-redux";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const FILTER_OPTIONS = [
  { label: "1 año atrás", value: 1 },
  { label: "2 años atrás", value: 2 },
  { label: "3 años atrás", value: 3 },
  { label: "General", value: 4 },
];

const MonthlyProjectsBalanceAnalytic = () => {
  const [filter, setFilter] = useState(4);
  const [visible, setVisible] = useState(true);
  const { fetchAnalyticMonthlyBalance } = useGetMonthlyProjectsBalance();

  // 👉 Aquí luego usarías tu hook, por ahora mock
  //const dataAnalytic = mockData;
  const dataAnalytic = useSelector(selectMonthlyBalanceDataAnalytic);

  useEffect(() => {
    fetchAnalyticMonthlyBalance(filter);
  }, [filter]);

  const chartData = useMemo(() => {
    if (!dataAnalytic) return { labels: [], datasets: [] };

    const labels = Object.entries(dataAnalytic).map(
      ([mes, cantidad]) => `${mes}: ${cantidad}`
    );

    return {
      labels,
      datasets: [
        {
          label: "Proyectos",
          data: Object.values(dataAnalytic),
          backgroundColor: [
            "rgba(206, 85, 85, 0.44)",
            "rgba(238, 151, 101, 0.45)",
            "rgba(83, 53, 174, 0.45)",
            "rgba(117, 199, 62, 0.45)",
            "rgba(221, 56, 105, 0.45)",
            "rgba(36, 172, 104, 0.45)",
            "rgba(79, 159, 196, 0.45)",
            "rgba(0, 255, 136, 0.45)",
            "rgba(117, 97, 167, 0.45)",
            "rgba(255, 238, 0, 0.47)",
            "rgba(30, 255, 0, 0.45)",
            "rgba(255, 0, 0, 0.45)",
          ],
          borderColor: "#121212",
          borderWidth: 2,
        },
      ],
    };
  }, [dataAnalytic]);

  return (
    <div className={cardStyles.card}>
      <div className={styles.header}>
        <h3>Balance de proyectos por mes</h3>
        <button
          className={styles.eyeBtn}
          onClick={() => setVisible(!visible)}
          aria-label="Toggle chart visibility"
        >
          {visible ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>

      <div className={styles.filters}>
        <label>
          Filtrar por:
          <select
            value={filter}
            onChange={(e) => setFilter(Number(e.target.value))}
          >
            {FILTER_OPTIONS?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible && (
        <div className={styles.chartWrapper}>
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: { color: "#ddd" },
                  position: "right",
                },
                tooltip: {
                  bodyColor: "#fff",
                },
              },
              onHover: (event, elements) => {
                if (elements.length) {
                  event.native.target.style.cursor = "pointer";
                } else {
                  event.native.target.style.cursor = "default";
                }
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MonthlyProjectsBalanceAnalytic;