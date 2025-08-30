import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetMostRentedProducts from "../../hooks/analytics/useGetMostRentedProducts";
import { selectMostRentedDataAnalytic } from "../../features/analytics/AnalyticSelector";
import cardStyles from "../../styles/analytics/analyticCard.module.css";
import styles from "../../styles/analytics/mostRentedProductsAnalytic.module.css";
import { formatAnalyticLabels } from "../../utils/formatAnalyticLabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MostRentedProductsAnalytic = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useGetMostRentedProducts(startDate, endDate, 20);
  const dataAnalytic = useSelector(selectMostRentedDataAnalytic);

  const chartData = useMemo(() => {
    if (!dataAnalytic?.products) return { labels: [], datasets: [] };

    return {
      labels: dataAnalytic.products.map((p) =>
        formatAnalyticLabels(p.brand, p.model, 12)
      ),
      datasets: [
        {
          label: "Cantidad alquilada",
          data: dataAnalytic.products.map((p) => p.amount),
          backgroundColor: "#7355ce",
          borderRadius: 6,
        },
      ],
    };
  }, [dataAnalytic]);

  return (
    <div className={cardStyles.card}>
      <div className={styles.header}>
        <h3>Productos más rentados</h3>
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
          Inicio:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {visible && (
        <div className={styles.chartWrapper}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { labels: { color: "#ddd" } },
                tooltip: { bodyColor: "#fff" },
              },
              scales: {
                x: {
                  ticks: { color: "#ccc" },
                  grid: { color: "rgba(115, 85, 206, 0.2)" },
                },
                y: {
                  ticks: {
                    color: "#ccc",
                    callback: function (value) {
                      return Number.isInteger(value) ? value : null;
                    },
                  },
                  grid: { color: "rgba(115, 85, 206, 0.2)" },
                },
              },
              // 👇 Evento click en barras o labels
              onClick: (evt, elements) => {
                if (!elements.length) return;
                const index = elements[0].index;
                const product = dataAnalytic.products[index];
                if (product) {
                  navigate(`/product/${product.product_id}`);
                }
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

export default MostRentedProductsAnalytic;
