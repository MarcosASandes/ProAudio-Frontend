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
