/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import useGetBudgetPdfByProjectId from '../../hooks/projects/useGetBudgetPdfByProjectId';


const BudgetPDFView = () => {
  const { id } = useParams();
  const getPdf = useGetBudgetPdfByProjectId();

  const [pdfUrl, setPdfUrl] = useState(null);
  const [hasError, setHasError] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const loadPdf = async () => {
      const url = await getPdf(id);
      if (url) {
        setPdfUrl(url);
      } else {
        setHasError(true);
      }
    };

    loadPdf();
  }, [id]);

  if (hasError) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: 'red', fontSize: '2rem' }}>No se pudo cargar el PDF</h1>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh' }}>
      {pdfUrl ? (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
          <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando PDF...</p>
      )}
    </div>
  );
};

export default BudgetPDFView;*/


/*------------------------------------------ */


/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import useGetBudgetPdfByProjectId from '../../hooks/projects/useGetBudgetPdfByProjectId';

const BudgetPDFView = () => {
  const { id } = useParams();
  const getPdf = useGetBudgetPdfByProjectId();

  const [pdfUrl, setPdfUrl] = useState(null);
  const [hasError, setHasError] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const loadPdf = async () => {
      const url = await getPdf(id);
      if (url) {
        setPdfUrl(url);
      } else {
        setHasError(true);
      }
    };

    loadPdf();
  }, [id]);

  if (hasError) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: 'red', fontSize: '2rem' }}>No se pudo cargar el PDF</h1>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh' }}>
      {pdfUrl ? (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.12.0/build/pdf.worker.min.js`}>
          <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando PDF...</p>
      )}
    </div>
  );
};

export default BudgetPDFView;*/


/*--------------------------------- */


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import stylesBackButtom from "../../styles/generic/backButton.module.css";

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import styles from "../../styles/projects/budgetView.module.css";

import useGetBudgetPdfByProjectId from '../../hooks/projects/useGetBudgetPdfByProjectId';

const BudgetPDFView = () => {
  const { id } = useParams();
  const getPdf = useGetBudgetPdfByProjectId();
  const navigate = useNavigate();

  const [pdfUrl, setPdfUrl] = useState(null);
  const [hasError, setHasError] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const loadPdf = async () => {
      const url = await getPdf(id);
      if (url) {
        setPdfUrl(url);
      } else {
        setHasError(true);
      }
    };

    loadPdf();
  }, [id]);

  if (hasError) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: 'red', fontSize: '2rem' }}>No se pudo cargar el PDF</h1>
      </div>
    );
  }

  return (
    <div className={styles.contenedorVisorPDF}>
      <div className="mb-3">
        <button
          type="button"
          className={stylesBackButtom.btnBackArrow}
          onClick={() => navigate("/project/" + id)}
        >
          <ArrowLeft size={24} />
          <span className="ms-2">Volver</span>
        </button>
      </div>

      {pdfUrl ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando PDF...</p>
      )}
    </div>
  );
};

export default BudgetPDFView;


