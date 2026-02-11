import React, { useState } from 'react';
import { SkillGallery } from '@widgets/SkillGallery/SkillGallery';
import ActionButtons, { ButtonActionType } from '@widgets/ActionButtons/ActionButtons';
import styles from './SkillCard.module.css';

export interface Skill {
  id: string | number;
  title: string;
  categories?: string[];
  description?: string;
  images?: string[];
}

export interface SkillCardProps {
  skill: Skill;
  proposeExchange?: React.ReactNode;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, proposeExchange }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAction = (action: ButtonActionType) => {
    switch (action) {
      case 'favorite':
        setIsFavorite((v) => !v);
        break;
      case 'share':
        console.log('Sharing skill:', skill.id);
        break;
      case 'more':
        console.log('More actions for skill:', skill.id);
        break;
    }
  };

  // Категории "
  const formattedCategories = skill.categories?.join(' / ') || '';

  return (
    <div className={styles.card}>
      {/* Блок с кнопками действий */}
      <div className={styles.actionsContainer}>
        <ActionButtons
          isFavorite={isFavorite}
          onAction={handleAction}
        />
      </div>
      
      {/* Основной контент */}
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.skillContent}>
            {/* Заголовок и категории как в макете */}
            <div className={styles.titleSection}>
              <h2 className={styles.skillTitle}>{skill.title}</h2>
              {formattedCategories && (
                <div className={styles.categoriesText}>
                  {formattedCategories}
                </div>
              )}
            </div>
            
            {/* Описание */}
            {skill.description && (
              <p className={styles.description}>{skill.description}</p>
            )}
            
            {/* Кнопка обмена */}
            {proposeExchange && (
              <div className={styles.exchangeButtonContainer}>
                {proposeExchange}
              </div>
            )}
          </div>
        </div>
        
        {/* Галерея */}
        <div className={styles.rightColumn}>
          <div className={styles.galleryContainer}>
            {skill.images && skill.images.length > 0 ? (
              <SkillGallery images={skill.images} />
            ) : (
              <div className={styles.noImages}>Нет изображений</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;