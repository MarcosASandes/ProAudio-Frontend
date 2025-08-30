/*import React, { useState, useMemo } from "react";
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
import { Eye, EyeOff, PackageSearch } from "lucide-react";
import cardStyles from "../../styles/analytics/analyticCard.module.css";
import styles from "../../styles/analytics/productBalanceAnalytic.module.css";
import { selectProductBalanceDataAnalytic } from "../../features/analytics/AnalyticSelector";
import useGetProductBalanceById from "../../hooks/analytics/useGetProductBalanceById";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductBalanceAnalytic = () => {
  const [visible, setVisible] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Hook que hace el fetch al backend
  useGetProductBalanceById(selectedProductId);
  const balanceData = useSelector(selectProductBalanceDataAnalytic);

  const chartData = useMemo(() => {
    if (!balanceData?.movements) return { labels: [], datasets: [] };

    return {
      labels: balanceData.movements.map((m) => m.date),
      datasets: [
        {
          label: "Movimientos",
          data: balanceData.movements.map((m) => m.amount),
          backgroundColor: balanceData.movements.map((m) =>
            m.amount < 0 ? "#d9534f" : "#5cb85c"
          ),
          borderRadius: 6,
        },
      ],
    };
  }, [balanceData]);

  return (
    <div className={cardStyles.card}>
      <div className={styles.header}>
        <h3>Balance de producto</h3>
        <div className={styles.actions}>
          <button
            className={styles.selectBtn}
            onClick={() => {
              // 👇 acá deberías abrir ProductSelectorModal
              // simulamos que seleccionamos un producto
              setSelectedProductId(90);
            }}
          >
            <PackageSearch size={18} />
            Seleccionar producto
          </button>
          <button
            className={styles.eyeBtn}
            onClick={() => setVisible(!visible)}
            aria-label="Toggle chart visibility"
          >
            {visible ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      {selectedProductId && visible && (
        <>
          <div className={styles.chartWrapper}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: "#ddd" } },
                  tooltip: {
                    bodyColor: "#fff",
                    callbacks: {
                      label: (ctx) =>
                        `${ctx.dataset.label}: ${ctx.raw.toLocaleString()}`,
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: { color: "#ccc" },
                    grid: { color: "rgba(115, 85, 206, 0.2)" },
                  },
                  y: {
                    ticks: { color: "#ccc" },
                    grid: { color: "rgba(115, 85, 206, 0.2)" },
                  },
                },
              }}
            />
          </div>

          {balanceData?.balance && (
            <div className={styles.balanceSummary}>
              <p>
                <strong>Gastos:</strong>{" "}
                <span className={styles.expense}>
                  {balanceData.balance.expenses.toLocaleString()}
                </span>
              </p>
              <p>
                <strong>Ingresos:</strong>{" "}
                <span className={styles.income}>
                  {balanceData.balance.earnings.toLocaleString()}
                </span>
              </p>
              <p>
                <strong>Balance:</strong>{" "}
                <span
                  className={
                    balanceData.balance.balance < 0
                      ? styles.expense
                      : styles.income
                  }
                >
                  {balanceData.balance.balance.toLocaleString()}
                </span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductBalanceAnalytic;*/

/*--------------------------------------------------- */

/*import React, { useState, useMemo } from "react";
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
import { Eye, EyeOff, PackageSearch } from "lucide-react";
import cardStyles from "../../styles/analytics/analyticCard.module.css";
import styles from "../../styles/analytics/productBalanceAnalytic.module.css";
import { selectProductBalanceDataAnalytic } from "../../features/analytics/AnalyticSelector";
import useGetProductBalanceById from "../../hooks/analytics/useGetProductBalanceById";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductBalanceAnalytic = () => {
  const [visible, setVisible] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useGetProductBalanceById(selectedProductId);
  const balanceData = useSelector(selectProductBalanceDataAnalytic);

  const chartData = useMemo(() => {
    if (!balanceData?.movements) return { labels: [], datasets: [] };

    const labels = balanceData.movements.map((m) => m.date);

    // ingresos: solo valores positivos
    const ingresos = balanceData.movements.map((m) =>
      m.amount > 0 ? m.amount : 0
    );

    // egresos: solo valores negativos
    const egresos = balanceData.movements.map((m) =>
      m.amount < 0 ? m.amount : 0
    );

    return {
      labels,
      datasets: [
        {
          label: "Ingresos",
          data: ingresos,
          backgroundColor: "#5cb85c",
          borderRadius: 6,
        },
        {
          label: "Egresos",
          data: egresos,
          backgroundColor: "#d9534f",
          borderRadius: 6,
        },
      ],
    };
  }, [balanceData]);

  return (
    <div className={cardStyles.card}>
      <div className={styles.header}>
        <h3>Balance de producto</h3>
        <div className={styles.actions}>
          <button
            className={styles.selectBtn}
            onClick={() => setSelectedProductId(90)}
          >
            <PackageSearch size={18} />
            Seleccionar producto
          </button>
          <button
            className={styles.eyeBtn}
            onClick={() => setVisible(!visible)}
            aria-label="Toggle chart visibility"
          >
            {visible ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      {selectedProductId && visible && (
        <>
          <div className={styles.chartWrapper}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: "#ddd" } },
                  tooltip: {
                    bodyColor: "#fff",
                    callbacks: {
                      // mostramos el action además del valor
                      label: (ctx) => {
                        const movement =
                          balanceData.movements[ctx.dataIndex];
                        return `${ctx.dataset.label}: ${ctx.raw.toLocaleString()} (${movement.action})`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: { color: "#ccc" },
                    grid: { color: "rgba(115, 85, 206, 0.2)" },
                },
                  y: {
                    ticks: { color: "#ccc" },
                    grid: { color: "rgba(115, 85, 206, 0.2)" },
                  },
                },
              }}
            />
          </div>

          {balanceData?.balance && (
            <div className={styles.balanceSummary}>
              <p>
                <strong>Gastos:</strong>{" "}
                <span className={styles.expense}>
                  {balanceData.balance.expenses.toLocaleString()}
                </span>
              </p>
              <p>
                <strong>Ingresos:</strong>{" "}
                <span className={styles.income}>
                  {balanceData.balance.earnings.toLocaleString()}
                </span>
              </p>
              <p>
                <strong>Balance:</strong>{" "}
                <span
                  className={
                    balanceData.balance.balance < 0
                      ? styles.expense
                      : styles.income
                  }
                >
                  {balanceData.balance.balance.toLocaleString()}
                </span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductBalanceAnalytic;*/

/*----------------------------------------------------- */

/*import React, { useState, useMemo, useEffect } from "react";
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
import { Eye, EyeOff, PackageSearch } from "lucide-react";
import cardStyles from "../../styles/analytics/analyticCard.module.css";
import styles from "../../styles/analytics/productBalanceAnalytic.module.css";
import { selectProductBalanceDataAnalytic } from "../../features/analytics/AnalyticSelector";
import useGetProductBalanceById from "../../hooks/analytics/useGetProductBalanceById";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductBalanceAnalytic = ({ selectedProduct, onOpenModal }) => {
  const [visible, setVisible] = useState(true);

  // Llamamos al hook solo si hay producto seleccionado
  useGetProductBalanceById(selectedProduct?.id || null);
  const balanceData = useSelector(selectProductBalanceDataAnalytic);

  const chartData = useMemo(() => {
    if (!balanceData?.movements) return { labels: [], datasets: [] };

    const labels = balanceData.movements.map((m) => m.date);
    const ingresos = balanceData.movements.map((m) =>
      m.amount > 0 ? m.amount : 0
    );
    const egresos = balanceData.movements.map((m) =>
      m.amount < 0 ? m.amount : 0
    );

    return {
      labels,
      datasets: [
        {
          label: "Ingresos",
          data: ingresos,
          backgroundColor: "#5cb85c",
          borderRadius: 6,
        },
        {
          label: "Egresos",
          data: egresos,
          backgroundColor: "#d9534f",
          borderRadius: 6,
        },
      ],
    };
  }, [balanceData]);

  return (
    <div className={cardStyles.card}>
      <div className={styles.header}>
        <h3>Balance de producto: {selectedProduct?.model}</h3>
        <div className={styles.actions}>
          <button className={styles.selectBtn} onClick={onOpenModal}>
            <PackageSearch size={18} />
            {selectedProduct ? selectedProduct.name : "Seleccionar producto"}
          </button>
          <button
            className={styles.eyeBtn}
            onClick={() => setVisible(!visible)}
            aria-label="Toggle chart visibility"
          >
            {visible ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      {selectedProduct && visible && (
        <>
          <div className={styles.chartWrapper}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: "#ddd" } },
                  tooltip: {
                    bodyColor: "#fff",
                    callbacks: {
                      label: (ctx) => {
                        const movement = balanceData.movements[ctx.dataIndex];
                        return `${
                          ctx.dataset.label
                        }: ${ctx.raw.toLocaleString()} (${movement.action})`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: { color: "#ccc" },
                    grid: { color: "rgba(115, 85, 206, 0.2)" },
                  },
                  y: {
                    ticks: { color: "#ccc" },
                    grid: { color: "rgba(115, 85, 206, 0.2)" },
                  },
                },
              }}
            />
          </div>

          {balanceData?.balance && (
            <div className={styles.balanceSummary}>
              <p>
                <strong>Gastos:</strong>{" "}
                <span className={styles.expense}>
                  {balanceData.balance.expenses.toLocaleString()}
                </span>
              </p>
              <p>
                <strong>Ingresos:</strong>{" "}
                <span className={styles.income}>
                  {balanceData.balance.earnings.toLocaleString()}
                </span>
              </p>
              <p>
                <strong>Balance:</strong>{" "}
                <span
                  className={
                    balanceData.balance.balance < 0
                      ? styles.expense
                      : styles.income
                  }
                >
                  {balanceData.balance.balance.toLocaleString()}
                </span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductBalanceAnalytic;*/

/*--------------------------------------------------- */

import React, { useState, useMemo, useEffect } from "react";
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
import { Eye, EyeOff, PackageSearch } from "lucide-react";
import cardStyles from "../../styles/analytics/analyticCard.module.css";
import styles from "../../styles/analytics/productBalanceAnalytic.module.css";
import { selectProductBalanceDataAnalytic } from "../../features/analytics/AnalyticSelector";
import useGetProductBalanceById from "../../hooks/analytics/useGetProductBalanceById";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductBalanceAnalytic = ({ selectedProduct, onOpenModal }) => {
  const [visible, setVisible] = useState(true);
  const { fetchAnalyticProductBalance } = useGetProductBalanceById();
  const navigate = useNavigate();

  // Llamamos al hook solo si hay producto seleccionado
  //useGetProductBalanceById(selectedProduct?.id || null);

  useEffect(() => {
    if (selectedProduct) {
      fetchAnalyticProductBalance(selectedProduct?.id);
    }
  }, [selectedProduct]);

  const balanceData = useSelector(selectProductBalanceDataAnalytic);

  const chartData = useMemo(() => {
    if (!balanceData?.movements) return { labels: [], datasets: [] };

    const labels = balanceData.movements.map((m) => m.date);
    const ingresos = balanceData.movements.map((m) =>
      m.amount > 0 ? m.amount : 0
    );
    const egresos = balanceData.movements.map((m) =>
      m.amount < 0 ? m.amount : 0
    );

    return {
      labels,
      datasets: [
        {
          label: "Ingresos",
          data: ingresos,
          backgroundColor: "#5cb85c",
          borderRadius: 6,
        },
        {
          label: "Egresos",
          data: egresos,
          backgroundColor: "#d9534f",
          borderRadius: 6,
        },
      ],
    };
  }, [balanceData]);

  return (
    <div className={cardStyles.card}>
      <div className={styles.header}>
        {selectedProduct ? (
          <h3>
            Balance de producto:{" "}
            <span
              title={`Ir al detalle de ${selectedProduct?.model}`}
              onClick={() => navigate(`/product/${selectedProduct.id}`)}
              className={styles.productNameBadge}
            >
              {selectedProduct?.model}
            </span>
          </h3>
        ) : (
          <h3>Balance de producto</h3>
        )}

        <div className={styles.actions}>
          <button className={styles.selectBtn} onClick={onOpenModal}>
            <PackageSearch size={18} />
            {selectedProduct ? selectedProduct.name : "Seleccionar producto"}
          </button>
          <button
            className={styles.eyeBtn}
            onClick={() => setVisible(!visible)}
            aria-label="Toggle chart visibility"
          >
            {visible ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      {!selectedProduct ? (
        <div className={styles.noProduct}>
          <p>Debes seleccionar un producto</p>
        </div>
      ) : (
        visible && (
          <>
            <div className={styles.chartWrapper}>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { labels: { color: "#ddd" } },
                    tooltip: {
                      bodyColor: "#fff",
                      callbacks: {
                        label: (ctx) => {
                          const movement = balanceData.movements[ctx.dataIndex];
                          return `${
                            ctx.dataset.label
                          }: ${ctx.raw.toLocaleString()} (${movement.action})`;
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      ticks: { color: "#ccc" },
                      grid: { color: "rgba(115, 85, 206, 0.2)" },
                    },
                    y: {
                      ticks: { color: "#ccc" },
                      grid: { color: "rgba(115, 85, 206, 0.2)" },
                    },
                  },
                  onClick: (evt, elements) => {
                    if (!elements.length) return;
                    const index = elements[0].index;
                    const movement = balanceData.movements[index];
                    if (movement) {
                      navigate(`/item/${movement.item_id}/details`);
                    }
                  },
                  onHover: (event, elements) => {
                    if (elements.length) {
                      event.native.target.style.cursor = "pointer"; // 👈 cuando hay algo bajo el mouse
                    } else {
                      event.native.target.style.cursor = "default"; // 👈 cuando no
                    }
                  },
                }}
              />
            </div>

            {balanceData?.balance && (
              <div className={styles.balanceSummary}>
                <p>
                  <strong>Gastos:</strong>{" "}
                  <span className={styles.expense}>
                    {balanceData.balance.expenses.toLocaleString()}
                  </span>
                </p>
                <p>
                  <strong>Ingresos:</strong>{" "}
                  <span className={styles.income}>
                    {balanceData.balance.earnings.toLocaleString()}
                  </span>
                </p>
                <p>
                  <strong>Balance:</strong>{" "}
                  <span
                    className={
                      balanceData.balance.balance < 0
                        ? styles.expense
                        : styles.income
                    }
                  >
                    {balanceData.balance.balance.toLocaleString()}
                  </span>
                </p>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default ProductBalanceAnalytic;
