import type { FC } from 'react';
import styles from './AboutSkill.module.css';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';

export interface AboutSkillProps {
  title: string;
  category: string;
  subcategory: string;
  description: string; //305 сиволов
  buttonText: string;
  onButtonClick: () => void;
}

export const AboutSkill: FC<AboutSkillProps> = ({
  title,
  category,
  subcategory,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.category}>
          {category} / {subcategory}
        </p>
      </div>

      <p className={styles.description}>{description}</p>

      <ButtonUI
        variant="primary"
        title={buttonText}
        onClick={onButtonClick}
        className={styles.button}
      />
    </section>
  );
};

// чтоб проверить import '../../styles/index.css'
// import { AboutSkill } from '@widgets/AboutSkill/AboutSkill';
// const MainPage: React.FC = () => {
//     return (
//         <div style={{ padding: 40 }}>
//       <AboutSkill
//         title='Игра на барабанах'
//     category='Творчество и искусство'
//     subcategory='Музыка и звук'
//    description={
//   'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений\n' +
//   'на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры'
// }
//     buttonText='Предложить обмен'
//     onButtonClick={() => console.log('click')}
//       />
//     </div>
//     )
// }

// export default MainPage;