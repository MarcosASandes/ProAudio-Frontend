import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../../styles/generic/CustomToast.module.css';
import logo from '../../assets/proaudio-logo-2.png';

const CustomToast = ({ message, type = 'normal' }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  // Limitar la cantidad de caracteres para mostrar el botón solo si es largo
  const isLongMessage = message.length > 80;

  return (
    <div className={`${styles.toast} ${type === 'error' ? styles.error : styles.normal}`}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.text}>
        {type === 'error' && <p className={styles.title}>Error</p>}

        <p
          className={`${styles.message} ${expanded ? styles.expanded : ''}`}
          title={message}
        >
          {message}
        </p>

        {isLongMessage && (
          <button className={styles.expandBtn} onClick={toggleExpanded} aria-label={expanded ? 'Ver menos' : 'Ver más'}>
            {expanded ? (
              <>
                Ver menos <ChevronUp size={16} />
              </>
            ) : (
              <>
                Ver más <ChevronDown size={16} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomToast;
