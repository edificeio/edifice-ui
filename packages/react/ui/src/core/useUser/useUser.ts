import { IUserDescription, IUserInfo, UserProfile } from "edifice-ts-client";

import { useOdeClient } from "../OdeClientProvider";
import { useOdeTheme } from "../ThemeProvider";

interface UserInfo extends Omit<IUserInfo, "type"> {
  type: UserProfile;
}

export interface useUserProps {
  user: UserInfo | undefined;
  avatar: string;
  userDescription: Partial<IUserDescription> | undefined;
}

export default function useUser(): useUserProps {
  const { user, userDescription, userProfile } = useOdeClient();
  const { theme } = useOdeTheme();

  function avatarUrl(): string {
    let avatar = userDescription?.picture;
    if (!avatar || avatar === "no-avatar.jpg" || avatar === "no-avatar.svg") {
      avatar = `${theme?.basePath}/img/illustrations/no-avatar.svg`;
    }
    return avatar;
  }

  return {
    user: {
      ...user,
      type: userProfile as UserProfile,
    } as UserInfo,
    avatar: avatarUrl(),
    userDescription,
  };
}
