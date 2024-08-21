import { useState, useId, useCallback, useMemo } from 'react';

import { IUserInfo, odeServices } from 'edifice-ts-client';
import { useTranslation } from 'react-i18next';

import { useHover } from '../../hooks';
import { useOdeClient } from '../OdeClientProvider/OdeClientProvider';
import { useBookmark } from '../useBookmark';
import { useHasWorkflow } from '../useHasWorkflow';
import { useOdeTheme } from '..';

export default function useHeader({
  user,
  avatar,
}: {
  user: IUserInfo | undefined;
  avatar: string;
}): any {
  const { appCode } = useOdeClient();
  const { t } = useTranslation();

  const { theme } = useOdeTheme();

  /**
   * Get document title for responsive usage
   */
  const title = t(appCode);

  /**
   * Collapse helper for Responsive
   */
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  /**
   * useHover hook
   */
  const [appsRef, isAppsHovered] = useHover<HTMLLIElement>();

  /**
   * IDs for Popover Component
   */
  const popoverAppsId = useId();
  const popoverSearchId = useId();

  /**
   * Get user info: avatar, username and welcome message
   */
  const userAvatar = avatar;
  const userName = user?.username;

  const welcomeUser = t('welcome', { username: user?.firstName });

  /**
   * Get Bookmarked Apps
   */
  const bookmarkedApps = useBookmark();

  /**
   * Handle Header Workflows
   */
  const communityWorkflow = useHasWorkflow(
    'net.atos.entng.community.controllers.CommunityController|view',
  );
  const conversationWorflow = useHasWorkflow(
    'org.entcore.conversation.controllers.ConversationController|view',
  );
  const searchWorkflow = useHasWorkflow(
    'fr.openent.searchengine.controllers.SearchEngineController|view',
  );

  const toggleCollapsedNav = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  const handleLogout = async () => {
    await odeServices.session().logout();
    console.log('Logout' + theme?.logoutCallback ?? '/auth/login');
    window.location.href = theme?.logoutCallback ?? '/auth/login';
  };

  return useMemo(
    () => ({
      title,
      bookmarkedApps,
      appsRef,
      isAppsHovered,
      popoverAppsId,
      popoverSearchId,
      userAvatar,
      userName,
      welcomeUser,
      communityWorkflow,
      conversationWorflow,
      searchWorkflow,
      isCollapsed,
      toggleCollapsedNav,
      handleLogout,
    }),
    [
      appsRef,
      bookmarkedApps,
      communityWorkflow,
      conversationWorflow,
      isAppsHovered,
      isCollapsed,
      popoverAppsId,
      popoverSearchId,
      searchWorkflow,
      title,
      toggleCollapsedNav,
      userAvatar,
      userName,
      welcomeUser,
    ],
  );
}
