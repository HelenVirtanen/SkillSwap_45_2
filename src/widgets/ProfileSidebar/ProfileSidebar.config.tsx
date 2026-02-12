import RequestIdea from '@assets/icons/request.svg?react';
import MessageIdea from '@assets/icons/message.svg?react';
import FavoriteIdea from '@assets/icons/like.svg?react';
import SkillsIdea from '@assets/icons/idea.svg?react';
import DetailIdea from '@assets/icons/user.svg?react';

export const ProfileSidebarconfig = [
  {
    title: 'Заявки',
    route: '/profile/requests',
    icon: <RequestIdea />,
  },
  {
    title: 'Мои обмены',
    route: '/profile/offers',
    icon: <MessageIdea />,
  },
  {
    title: 'Избранное',
    route: '/profile/favorite',
    icon: <FavoriteIdea />,
  },
  {
    title: 'Мои навыки',
    route: '/profile/skills',
    icon: <SkillsIdea />,
  },
  {
    title: 'Личные данные',
    route: '/profile/details',
    icon: <DetailIdea />,
  },
];
