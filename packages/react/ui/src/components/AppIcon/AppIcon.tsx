import { forwardRef, Ref } from 'react';

import clsx from 'clsx';
import { IWebApp } from 'edifice-ts-client';

import { useOdeIcons, usePaths } from '../../core';
import { Image } from '../Image';

export type AppIconSize = '24' | '32' | '40' | '48' | '80' | '160';

export interface BaseProps {
  /**
   * Define icon size
   */
  size?: AppIconSize;
  /**
   * App information to get code and name
   */
  app?: IWebApp | string;
  /**
   * Custom class name
   */
  className?: string;
}

type AppVariants = 'square' | 'circle' | 'rounded';
type SquareVariant = Extract<AppVariants, 'square'>;

type SquareIcon = {
  /**
   * Show icon full width
   */
  iconFit?: 'contain';
  /**
   * Square variant
   */
  variant?: SquareVariant;
};

type VariantsIcon = {
  /**
   * Add padding around icon
   */
  iconFit: 'ratio';
  /**
   * Rounded or Circle variant
   */
  variant: AppVariants;
};

export type Props = SquareIcon | VariantsIcon;
export type AppIconProps = BaseProps & Props;

/**
 * Icon Component used to display the icon of an application
 */
const AppIcon = forwardRef(
  (
    {
      app,
      size = '24',
      iconFit = 'contain',
      variant = 'square',
      className = '',
    }: AppIconProps,
    ref: Ref<SVGSVGElement>,
  ) => {
    const { isIconUrl, getIconCode } = useOdeIcons();
    const [, iconPath] = usePaths();

    const isSquare = variant === 'square';
    const isRounded = variant === 'rounded';
    const isCircle = variant === 'circle';
    const isContain = iconFit === 'contain';
    const isRatio = iconFit === 'ratio';

    const iconSizes = {
      'icon-xs': size === '24',
      'icon-sm': size === '40',
      'icon-md': size === '48',
      'icon-lg': size === '80',
      'icon-xl': size === '160',
    };

    const iconVariant = {
      square: isSquare,
      rounded: isRounded,
      'rounded-circle': isCircle,
    };

    const iconFits = {
      'icon-contain': isContain,
      'icon-ratio': isRatio,
    };

    const icon =
      typeof app === 'string'
        ? app
        : app?.icon !== undefined
          ? app.icon
          : 'placeholder';
    const displayName =
      typeof app !== 'string' && app?.displayName !== undefined
        ? app.displayName
        : '';
    const code = app ? getIconCode(app) : '';
    const isIconURL = isIconUrl(icon);

    const appCode = code || 'placeholder';

    if (isIconURL) {
      const classes = clsx('h-full', className);
      return (
        <Image
          src={icon}
          alt={displayName}
          objectFit="contain"
          width={size}
          height={size}
          className={classes}
        />
      );
    }

    const classes = clsx(
      'app-icon',
      {
        ...iconSizes,
        ...iconVariant,
        ...iconFits,
        [`bg-light-${appCode}`]: appCode && !isContain,
        [`color-app-${appCode}`]: appCode,
      },
      className,
    );

    return (
      <div
        className={classes}
        style={{ width: size + 'px', height: size + 'px' }}
      >
        <svg
          ref={ref}
          width={size}
          height={size}
          role="img"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <use xlinkHref={`${iconPath}/apps.svg#${appCode}`} />
        </svg>
      </div>
    );
  },
);

AppIcon.displayName = 'AppIcon';

export default AppIcon;
