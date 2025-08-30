// ProjectsTimelineAnalytic.jsx
/*import React, { useState, useEffect, useRef, useMemo } from "react";
import { Eye, EyeOff } from "lucide-react";
import moment from "moment";
import { DataSet, Timeline as VisTimeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import styles from "../../styles/analytics/projectsTimelineAnalytic.module.css";

// Mock de datos
const mockData = {
  range: {
    start: "2025-07-01T00:00:00",
    end: "2025-07-31T23:59:59",
  },
  projects: [
    {
      project_id: 1,
      name: "Festival del Venado Tuerto",
      start_date: "2025-07-12T20:30:30",
      end_date: "2025-07-14T02:00:00",
    },
    {
      project_id: 2,
      name: "Boda en la Playa",
      start_date: "2025-07-18T10:00:00",
      end_date: "2025-07-18T23:00:00",
    },
    {
      project_id: 3,
      name: "Concierto Rock",
      start_date: "2025-07-22T18:00:00",
      end_date: "2025-07-23T02:00:00",
    },
  ],
};

const ProjectsTimelineAnalytic = () => {
  const [startDate, setStartDate] = useState("2025-07-01");
  const [endDate, setEndDate] = useState("2025-07-31");
  const [visible, setVisible] = useState(true);

  const timelineRef = useRef(null);
  const timelineInstance = useRef(null);

  // Filtrar proyectos según rango
  const filteredProjects = useMemo(() => {
    return mockData.projects.filter((p) => {
      const start = new Date(p.start_date);
      const end = new Date(p.end_date);
      return start >= new Date(startDate) && end <= new Date(endDate);
    });
  }, [startDate, endDate]);

  const groups = useMemo(
    () => filteredProjects.map((p) => ({ id: p.project_id, content: p.name })),
    [filteredProjects]
  );

  const items = useMemo(
    () =>
      filteredProjects.map((p) => ({
        id: p.project_id,
        group: p.project_id, // ahora cada proyecto está en su propia fila
        content: p.name,
        start: new Date(p.start_date),
        end: new Date(p.end_date),
        style:
          "background-color: #7355ce; color: #fff; border-radius: 6px; padding: 4px 8px; text-align: center;",
        title: `${p.name}\n${moment(p.start_date).format(
          "DD/MM/YYYY HH:mm"
        )} - ${moment(p.end_date).format("DD/MM/YYYY HH:mm")}`,
      })),
    [filteredProjects]
  );

  // Inicializar vis-timeline
  useEffect(() => {
    if (timelineRef.current && visible) {
      const container = timelineRef.current;
      const datasetGroups = new DataSet(groups);
      const datasetItems = new DataSet(items);

      const options = {
        stack: true,
        start: moment(startDate).toDate(),
        end: moment(endDate).toDate(),
        editable: false,
        margin: {
          item: 10,
          axis: 5,
        },
        orientation: "top",
        showCurrentTime: true,
        zoomMin: 1000 * 60 * 60 * 24, // 1 día
        zoomMax: 1000 * 60 * 60 * 24 * 31, // 1 mes
      };

      timelineInstance.current = new VisTimeline(
        container,
        datasetItems,
        datasetGroups,
        options
      );
    }

    // Limpiar al desmontar
    return () => {
      if (timelineInstance.current) {
        timelineInstance.current.destroy();
        timelineInstance.current = null;
      }
    };
  }, [groups, items, startDate, endDate, visible]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Línea de tiempo de Proyectos</h3>
        <button
          className={styles.eyeBtn}
          onClick={() => setVisible(!visible)}
          aria-label="Toggle visibility"
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
        <div ref={timelineRef} className={styles.timelineWrapper}></div>
      )}
    </div>
  );
};

export default ProjectsTimelineAnalytic;*/

/*-------------------------------------------------------- */

//UTILIZANDO VIS-TIMELINES
// ProjectsTimelineAnalytic.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Eye, EyeOff } from "lucide-react";
import moment from "moment";
import { DataSet, Timeline as VisTimeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import styles from "../../styles/analytics/projectsTimelineAnalytic.module.css";

// Mock de datos
const mockData = {
  range: {
    start: "2025-07-01T00:00:00",
    end: "2025-07-31T23:59:59",
  },
  projects: [
    {
      project_id: 1,
      name: "Festival del Venado Tuerto",
      start_date: "2025-07-12T20:30:30",
      end_date: "2025-07-14T02:00:00",
    },
    {
      project_id: 2,
      name: "Boda en la Playa",
      start_date: "2025-07-18T10:00:00",
      end_date: "2025-07-18T23:00:00",
    },
    {
      project_id: 3,
      name: "Concierto Rock",
      start_date: "2025-07-22T18:00:00",
      end_date: "2025-07-23T02:00:00",
    },
    {
      project_id: 4,
      name: "Festival del Venado Tuerto",
      start_date: "2025-06-12T20:30:30",
      end_date: "2025-08-14T02:00:00",
    },
    {
      project_id: 5,
      name: "Boda en la Playa",
      start_date: "2025-02-18T10:00:00",
      end_date: "2025-03-18T23:00:00",
    },
    {
      project_id: 6,
      name: "Concierto Rock",
      start_date: "2025-07-22T18:00:00",
      end_date: "2025-09-23T02:00:00",
    },
    {
      project_id: 7,
      name: "Festival del Venado Tuerto",
      start_date: "2025-11-12T20:30:30",
      end_date: "2025-12-14T02:00:00",
    },
    {
      project_id: 8,
      name: "Boda en la Playa",
      start_date: "2025-02-18T10:00:00",
      end_date: "2025-05-18T23:00:00",
    },
    {
      project_id: 9,
      name: "Concierto Rock",
      start_date: "2025-04-22T18:00:00",
      end_date: "2025-09-23T02:00:00",
    },
    {
      project_id: 11,
      name: "QUCOY",
      start_date: "2025-04-22T18:00:00",
      end_date: "2025-09-23T02:00:00",
    },
    {
      project_id: 12,
      name: "QUCOY",
      start_date: "2025-04-22T18:00:00",
      end_date: "2025-09-23T02:00:00",
    },
    {
      project_id: 13,
      name: "QUCOY",
      start_date: "2025-04-22T18:00:00",
      end_date: "2025-09-23T02:00:00",
    },
    {
      project_id: 14,
      name: "QUCOY",
      start_date: "2025-04-22T18:00:00",
      end_date: "2025-09-23T02:00:00",
    },
  ]
};

const ProjectsTimelineAnalytic = () => {
  const [startDate, setStartDate] = useState("2025-07-01");
  const [endDate, setEndDate] = useState("2025-07-31");
  const [visible, setVisible] = useState(true);

  const timelineRef = useRef(null);
  const timelineInstance = useRef(null);

  // Mostrar proyectos que INTERSECTAN el rango
  const filteredProjects = useMemo(() => {
    const rangeStart = new Date(startDate);
    const rangeEnd = new Date(endDate);

    return mockData.projects.filter((p) => {
      const projectStart = new Date(p.start_date);
      const projectEnd = new Date(p.end_date);
      return projectEnd >= rangeStart && projectStart <= rangeEnd;
    });
  }, [startDate, endDate]);

  // Grupos para vis
  const groups = useMemo(() => {
    return filteredProjects.map((p) => ({
      id: p.project_id,
      content: p.name,
    }));
  }, [filteredProjects]);

  // Items para vis
  const items = useMemo(() => {
    return filteredProjects.map((p) => ({
      id: p.project_id,
      group: p.project_id,
      content: p.name,
      start: new Date(p.start_date),
      end: new Date(p.end_date),
      className: "timeline-project", // Aquí está el className
      title: `${p.name}\n${moment(p.start_date).format(
        "DD/MM/YYYY HH:mm"
      )} - ${moment(p.end_date).format("DD/MM/YYYY HH:mm")}`,
    }));
  }, [filteredProjects]);

  // Inicializar solo una vez
  useEffect(() => {
    if (timelineRef.current && !timelineInstance.current && visible) {
      const options = {
        stack: true,
        start: moment(startDate).toDate(),
        end: moment(endDate).toDate(),
        editable: false,
        margin: { item: 10, axis: 5 },
        orientation: "top",
        showCurrentTime: true,
        zoomMin: 1000 * 60 * 60 * 24,
        zoomMax: 1000 * 60 * 60 * 24 * 31,
        groupHeightMode: "fixed", // 👈 importante
      };

      timelineInstance.current = new VisTimeline(
        timelineRef.current,
        new DataSet(items),
        new DataSet(groups),
        options
      );
    }

    return () => {
      if (timelineInstance.current) {
        timelineInstance.current.destroy();
        timelineInstance.current = null;
      }
    };
  }, [visible]);

  // Actualizar timeline dinámicamente
  useEffect(() => {
    if (timelineInstance.current && visible) {
      timelineInstance.current.setItems(new DataSet(items));
      timelineInstance.current.setGroups(new DataSet(groups));
      timelineInstance.current.setWindow(
        moment(startDate).toDate(),
        moment(endDate).toDate()
      );
    }
  }, [items, groups, startDate, endDate, visible]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Línea de tiempo de Proyectos</h3>
        <button
          className={styles.eyeBtn}
          onClick={() => setVisible(!visible)}
          aria-label="Toggle visibility"
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
        <div ref={timelineRef} className={styles.timelineWrapper}></div>
      )}
    </div>
  );
};

export default ProjectsTimelineAnalytic;
