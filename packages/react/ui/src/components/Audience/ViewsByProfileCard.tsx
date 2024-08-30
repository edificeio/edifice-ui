import { useTranslation } from 'react-i18next';

import { ViewsDetailsProfile } from 'edifice-ts-client';
import { Icon } from '..';
import { StringUtils } from '../../utils';

export interface ViewsCardProps {
  viewsByProfile: ViewsDetailsProfile;
}

const ViewsByProfileCard = ({ viewsByProfile }: ViewsCardProps) => {
  const { t } = useTranslation();
  const profile = viewsByProfile.profile.toLowerCase();
  const classNameIcon = `views-detail-icon rounded p-8 views-detail-icon-${profile}`;

  function getIcon(profile: string) {
    switch (profile) {
      case 'student':
        return <Icon name="audience/views/student" />;
      case 'relative':
        return <Icon name="audience/views/parent" />;
      case 'teacher':
        return <Icon name="audience/views/teacher" />;
      case 'personnel':
        return <Icon name="audience/views/personnel" />;
      case 'guest':
        return <Icon name="audience/views/guest" />;
      default:
        return <Icon name="users" />;
    }
  }

  return (
    <div key={profile} className="views-detail-line p-8 ms-32 mb-12">
      <div className={classNameIcon}>{getIcon(profile)}</div>
      <div className="h3">{StringUtils.toCounter(viewsByProfile.counter)}</div>
      <div>{t(`audience.views.uniqueViewsPerProfile.${profile}`)}</div>
    </div>
  );
};

ViewsByProfileCard.displayName = 'ViewsByProfileCard';

export default ViewsByProfileCard;
