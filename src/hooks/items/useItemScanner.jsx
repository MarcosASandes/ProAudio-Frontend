/*import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useDispatch } from "react-redux";
import { getItemById } from "../../services/itemApiService";
import {
  setSelectedItem,
  clearSelectedItem,
} from "../../features/items/ItemSlice";
import { toast } from "react-toastify";

const useItemScanner = () => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const dispatch = useDispatch();

  const startScan = async () => {
    setCameraError(false);
    if (!scannerRef.current) return;

    // ✅ Usa ID fijo en vez de scannerRef.current.id
    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCodeRef.current = html5QrCode;

    const config = { fps: 10, qrbox: 250 };

    try {
      await html5QrCode.start(
        { facingMode: "environment" }, // Usa la webcam
        config,
        async (decodedText) => {
          html5QrCode.stop();
          setScanning(false);
          try {
            const response = await getItemById(decodedText);
            dispatch(setSelectedItem(response));
            toast.success("Artículo escaneado correctamente");
          } catch (error) {
            toast.error("No se pudo obtener el artículo");
            dispatch(clearSelectedItem());
          }
        },
        (errorMessage) => {
          console.warn("QR Error:", errorMessage);
        }
      );
      setScanning(true);
    } catch (err) {
      console.error("Error starting QR Code:", err);
      setCameraError(true);
    }
  };

  const stopScan = () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      html5QrCodeRef.current
        .stop()
        .then(() => console.log("Scanner stopped"))
        .catch((err) => console.warn("No scanner to stop:", err));
    }
    setScanning(false);
  };

  const retryCamera = () => {
    stopScan();
    setCameraError(false);
  };

  return {
    startScan,
    stopScan,
    retryCamera,
    scanning,
    cameraError,
    scannerRef, // 👈 este ref ahora debe ir a un div con id="qr-reader"
  };
};

export default useItemScanner;*/


/*-------------------------- */

/*import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useDispatch } from "react-redux";
import { getItemById } from "../../services/itemApiService";
import { setSelectedItem, clearSelectedItem } from "../../features/items/ItemSlice";
import { toast } from "react-toastify";

const useItemScanner = () => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const dispatch = useDispatch();

  const startScan = async () => {
    setCameraError(false);

    if (!scannerRef.current) {
      console.error("Scanner DOM ref not found");
      setCameraError(true);
      return;
    }

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(scannerRef.current.id);
    }

    const html5QrCode = html5QrCodeRef.current;
    const config = { fps: 10, qrbox: 250 };

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        async (decodedText) => {
          try {
            await html5QrCode.stop();
          } catch (err) {
            console.warn("Already stopped:", err);
          }
          setScanning(false);

          try {
            const response = await getItemById(decodedText);
            dispatch(setSelectedItem(response));
            toast.success("Artículo escaneado correctamente");
          } catch (error) {
            toast.error("No se pudo obtener el artículo");
            dispatch(clearSelectedItem());
          }
        },
        (errorMessage) => {
          console.log("QR scan error:", errorMessage);
        }
      );
      setScanning(true);
    } catch (err) {
      console.error("Error starting QR Code scanner:", err);
      setCameraError(true);
      stopScan(); // asegurar limpieza
    }
  };

  const stopScan = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.getState() === 2) { // 2 = SCANNING
      try {
        await html5QrCodeRef.current.stop();
        await html5QrCodeRef.current.clear();
        console.log("Scanner stopped and cleared");
      } catch (err) {
        console.warn("Nothing to stop:", err);
      }
    }
    setScanning(false);
  };

  const retryCamera = () => {
    stopScan();
    setCameraError(false);
  };

  return {
    startScan,
    stopScan,
    retryCamera,
    scanning,
    cameraError,
    scannerRef,
  };
};

export default useItemScanner;*/

/*----------------------- */

import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useDispatch } from "react-redux";
import { getItemById } from "../../services/itemApiService";
import { setSelectedItem, clearSelectedItem } from "../../features/items/ItemSlice";
import { toast } from "react-toastify";

const useItemScanner = () => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const dispatch = useDispatch();

  const startScan = async () => {
    if (!scannerRef.current) return;

    const html5QrCode = new Html5Qrcode(scannerRef.current.id);
    html5QrCodeRef.current = html5QrCode;

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          await html5QrCode.stop();
          setScanning(false);
          try {
            const response = await getItemById(decodedText);
            dispatch(setSelectedItem(response));
            toast.success("Artículo escaneado correctamente");
          } catch {
            dispatch(clearSelectedItem());
            toast.error("No se pudo obtener el artículo");
          }
        }
      );
      setScanning(true);
      setCameraError(false);
    } catch (err) {
      console.error("Error starting QR Code scanner:", err);
      setCameraError(true);
    }
  };

  const stopScan = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current._isScanning) {
      await html5QrCodeRef.current.stop();
    }
    setScanning(false);
  };

  const retryCamera = () => {
    stopScan();
    setCameraError(false);
  };

  return {
    startScan,
    stopScan,
    retryCamera,
    scanning,
    cameraError,
    scannerRef,
  };
};

export default useItemScanner;
