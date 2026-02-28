import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';

import 'swiper/css';

import styles from './SkillGallery.module.css';

import ChevronLeftIcon from '@assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '@assets/icons/chevron-right.svg?react';

export interface SkillGalleryProps {
  images: string[];
}

export const SkillGallery: FC<SkillGalleryProps> = ({ images }) => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [mainImageErrors, setMainImageErrors] = useState<Record<number, boolean>>({});
  
  // Фильтруем изображения, которые не загрузились с ошибкой
  const validImages = images.filter((_, index) => !imageErrors[index]);
  
  // Если нет валидных изображений, показываем заглушку
  if (validImages.length === 0) {
    return (
      <section className={styles.root}>
        <div className={styles.noImages}>
          <p>Нет изображений для отображения</p>
        </div>
      </section>
    );
  }

  const previewImages = validImages.slice(1, 4);
  const restCount = validImages.length - 4;

  const handleImageError = (index: number, type: 'main' | 'preview') => {
    if (type === 'main') {
      setMainImageErrors(prev => ({ ...prev, [index]: true }));
    } else {
      setImageErrors(prev => ({ ...prev, [index]: true }));
    }
  };

  return (
    <section className={styles.root}>
      {/* Левая колонка - основное изображение */}
      <div className={styles.main}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation={{
            prevEl: `.${styles.prev}`,
            nextEl: `.${styles.next}`,
          }}
          loop={validImages.length > 1}
        >
          {validImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              {!mainImageErrors[idx] ? (
                <img
                  className={styles.mainImage}
                  src={img}
                  alt={`Slide ${idx}`}
                  onError={() => handleImageError(idx, 'main')}
                  loading="lazy"
                />
              ) : (
                <div className={styles.imageError}>
                  <p>Изображение не загрузилось</p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {validImages.length > 1 && (
          <>
            <button className={`${styles.navButton} ${styles.prev}`}>
              <ChevronLeftIcon />
            </button>

            <button className={`${styles.navButton} ${styles.next}`}>
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>

      {/* Правая колонка - превью */}
      {validImages.length > 1 && (
        <div className={styles.preview}>
          {previewImages.map((img, idx) => {
            const isLast = idx === previewImages.length - 1 && restCount > 0;
            const originalIndex = idx + 1; // +1 потому что пропускаем первое изображение

            return (
              <div key={idx} className={styles.previewItem}>
                {!imageErrors[originalIndex] ? (
                  <img 
                    src={img} 
                    alt={`Preview ${idx}`}
                    onError={() => handleImageError(originalIndex, 'preview')}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.previewError}>
                    <span>Ошибка</span>
                  </div>
                )}

                {isLast && <div className={styles.overlay}>+{restCount}</div>}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};