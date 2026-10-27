import { FaWhatsapp } from 'react-icons/fa';
import styles from './WhatsAppFloat.module.css';

const WHATSAPP_URL = 'https://wa.me/919662969044';

const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      className={styles.float}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className={styles.icon} aria-hidden />
    </a>
  );
};

export default WhatsAppFloat;
