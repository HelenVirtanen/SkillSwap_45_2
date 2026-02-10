import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

import styles from './SkillGallery.module.css';

import ChevronLeftIcon from '@assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '@assets/icons/chevron-right.svg?react';

export interface SkillGalleryProps {
  images: string[];
}

export const SkillGallery: FC<SkillGalleryProps> = ({ images }) => {
  const previewImages = images.slice(1, 4);
  const restCount = images.length - 4;

  return (
    <section className={styles.root}>
      {/* Левая колонка */}
      <div className={styles.main}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation={{
            prevEl: `.${styles.prev}`,
            nextEl: `.${styles.next}`,
          }}
          loop={images.length > 1}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                className={styles.mainImage}
                src={img}
                alt={`Slide ${idx}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={`${styles.navButton} ${styles.prev}`}>
          <ChevronLeftIcon />
        </button>

        <button className={`${styles.navButton} ${styles.next}`}>
          <ChevronRightIcon />
        </button>
      </div>

      {/* Правая колонка */}
      <div className={styles.preview}>
        {previewImages.map((img, idx) => {
          const isLast = idx === previewImages.length - 1 && restCount > 0;

          return (
            <div key={idx} className={styles.previewItem}>
              <img src={img} alt={`Preview ${idx}`} />

              {isLast && <div className={styles.overlay}>+{restCount}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
};
