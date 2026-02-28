import type { FC } from 'react';
import type { AboutSkillProps } from '@widgets/AboutSkill/AboutSkill';
import type { SkillGalleryProps } from '@widgets/SkillGallery/SkillGallery';
import IconRight from '@assets/icons/edit.svg?react';

import styles from './ModalConfirmOffer.module.css';
import { AboutSkill } from '@widgets/AboutSkill/AboutSkill';
import { SkillGallery } from '@widgets/SkillGallery/SkillGallery';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';

export interface ModalConfirmOfferProps {
  title: string;
  description: string;

  // Пробрасываем пропсы внутрь компонентов
  aboutSkillProps: Omit<AboutSkillProps, 'actions'>;
  galleryProps: SkillGalleryProps;

  onEdit: () => void;
  onConfirm: () => void;
}

export const ModalConfirmOffer: FC<ModalConfirmOfferProps> = ({
  title,
  description,
  aboutSkillProps,
  galleryProps,
  onEdit,
  onConfirm,
}) => {
  return (
    <div className={styles.modal}>
      {/* Верхняя секция */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      {/* Контент */}
      <div className={styles.content}>
        {/* Левая колонка */}
        <div className={styles.leftColumn}>
          <AboutSkill
            {...aboutSkillProps}
            actions={
              <div className={styles.actions}>
                <ButtonUI
                  variant="secondary"
                  title="Редактировать"
                  iconRight={<IconRight/>}
                  onClick={onEdit}
                  className={styles.buttonModal}
                />

                <ButtonUI
                  variant="primary"
                  title="Готово"
                  onClick={onConfirm}
                  className={styles.button_modal}

                />
              </div>
            }
          />
        </div>

        {/* Правая колонка */}
        <SkillGallery {...galleryProps} />
      </div>
    </div>
  );
};
