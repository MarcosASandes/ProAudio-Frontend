import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showToast, showToastError } from "../../utils/toastUtils";
import { exitItemToProject } from "../../services/projectApiService";
import { addItemToOutletInStore } from "../../features/projects/ProjectSlice";
import { removeItemToOutletInStore } from "../../features/projects/ProjectSlice";

const useScanOutletItem = (id) => {
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
            const idProject = id;
            const idItem = decodedText;
            console.log(`En el método useScanOutletItem llegan los IDs: - Proyecto: ${idProject} - Item: ${idItem}`);
            const data = await exitItemToProject(idProject, idItem);
            if(data.status == "ENABLED"){
                dispatch(addItemToOutletInStore(data));
            }else{
                dispatch(removeItemToOutletInStore(data.item_id));
            }
            showToast("Artículo despachado correctamente.");
          } catch (error) {
            showToastError("No se pudo despachar el artículo.");
            console.error("Error al despachar artículo:", error);
          }
        }
      );
      setScanning(true);
      setCameraError(false);
    } catch (err) {
      console.error("Error iniciando el escaneo:", err);
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

export default useScanOutletItem;
