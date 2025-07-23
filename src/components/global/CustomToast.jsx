/*import styles from '../../styles/generic/CustomToast.module.css';
import logo from '../../assets/proaudio-logo-2.png';

const CustomToast = ({ message, type = 'normal' }) => {
  return (
    <div className={`${styles.toast} ${type === 'error' ? styles.error : styles.normal}`}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.separator}></div>
      <div className={styles.text}>
        {type === 'error' && <p className={styles.title}>Error</p>}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CustomToast;*/


/*----------------------------- */

/*import styles from '../../styles/generic/CustomToast.module.css';
import logo from '../../assets/proaudio-logo-2.png';

const CustomToast = ({ message, type = 'normal' }) => {
  return (
    <div className={`${styles.toast} ${type === 'error' ? styles.error : styles.normal}`}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.separator}>|</div>
      <div className={styles.text}>
        {type === 'error' && <p className={styles.title}>Error</p>}
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default CustomToast;*/

/*------------------- */

import styles from '../../styles/generic/CustomToast.module.css';
import logo from '../../assets/proaudio-logo-2.png';

const CustomToast = ({ message, type = 'normal' }) => {
  return (
    <div className={`${styles.toast} ${type === 'error' ? styles.error : styles.normal}`}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.separator} />
      <div className={styles.text}>
        {type === 'error' && <p className={styles.title}>Error</p>}
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default CustomToast;
