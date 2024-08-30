import type { IconName } from '@edifice.io/icons';
import spriteHref from '@edifice.io/icons/icons.svg';
import type { SVGProps } from 'react';

/**
 * IconSize (default to 24x24)
 */
type IconSize =
  | '16'
  | '18'
  | '20'
  | '22'
  | '24'
  | '40'
  | '36'
  | '48'
  | (string & {});

export const Icon = ({
  name,
  size = '24',
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: IconSize;
}) => {
  return (
    <svg {...props} width={size} height={size}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
};

Icon.displayName = 'Icon';
