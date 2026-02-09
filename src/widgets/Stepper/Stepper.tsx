import type { FC } from 'react';
import styles from './Stepper.module.css';

export interface StepperProps {
  currentStep?: number;
  totalSteps?: number;
}

type Range = readonly [min: number, max: number];

const withinRange = (value: number, [min, max]: Range) =>
  Math.min(Math.max(value, min), max);

const createSteps = (total: number) =>
  Array.from({ length: total }, (_, index) => index + 1);

const Stepper: FC<StepperProps> = ({ currentStep = 1, totalSteps = 3 }) => {
  const safeTotalSteps = Math.max(1, totalSteps);
  const safeCurrentStep = withinRange(currentStep, [1, safeTotalSteps]);

  const steps = createSteps(safeTotalSteps);

  return (
    <div className={styles.container}>
      <p className={styles.label}>
        Шаг {safeCurrentStep} из {safeTotalSteps}
      </p>

      <div className={styles.stepsContainer}>
        {steps.map((stepNumber) => (
          <span
            className={`${styles.step} ${
              stepNumber <= safeCurrentStep ? styles.active : styles.inactive
            }`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
};

export default Stepper;
