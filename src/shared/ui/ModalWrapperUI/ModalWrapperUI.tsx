import { ReactNode, MouseEvent } from "react";
import { createPortal } from "react-dom";
import styles from "./ModalWrapperUI.module.css";

type ModalWrapperUIProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "md" | "lg"; // md = 556, lg = 1024
};

export const ModalWrapperUI = ({
  isOpen,
  onClose,
  children,
  size = "md",
}: ModalWrapperUIProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // чтобы клик внутри не закрывал модалку
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={`${styles.modal} ${
          size === "lg" ? styles.large : styles.medium
        }`}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
