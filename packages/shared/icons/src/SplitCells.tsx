import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSplitCells = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="currentColor" clipPath="url(#split-cells_svg__a)">
      <path d="M3.444 2C2.554 2 2 2.635 2 3.222v1.89a1 1 0 1 1-2 0v-1.89C0 1.355 1.634 0 3.444 0h4.278a1 1 0 1 1 0 2zM15.278 1a1 1 0 0 1 1-1h4.278C22.366 0 24 1.355 24 3.222v1.89a1 1 0 0 1-2 0v-1.89C22 2.635 21.445 2 20.556 2h-4.278a1 1 0 0 1-1-1M1 17.89a1 1 0 0 1 1 1v1.888C2 21.366 2.555 22 3.444 22h4.278a1 1 0 1 1 0 2H3.444C1.634 24 0 22.645 0 20.778v-1.889a1 1 0 0 1 1-1M23 17.89a1 1 0 0 1 1 1v1.888C24 22.645 22.366 24 20.556 24h-4.278a1 1 0 0 1 0-2h4.278c.89 0 1.444-.634 1.444-1.222v-1.889a1 1 0 0 1 1-1M14 12a1 1 0 0 1 1-1h5.586l-2.293-2.293a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L20.586 13H15a1 1 0 0 1-1-1M9 13a1 1 0 1 0 0-2H3.414l2.293-2.293a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414-1.414L3.414 13z" />
    </g>
    <defs>
      <clipPath id="split-cells_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgSplitCells;
