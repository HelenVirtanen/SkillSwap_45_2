import React from "react";
import styles from "./Logo.module.css"
import logo from "@assets/icons/logo.svg"

const Logo: React.FC = () => (
  <a href="/" className={styles.logoLink} aria-label="Логотип SkillSwap" >
    <img src={logo} alt="SkillSwap" className={styles.logoIcon} />
    <span className={styles.logoText}>SkillSwap</span>
    </a>
)

export default Logo;

