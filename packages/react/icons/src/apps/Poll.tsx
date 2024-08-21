import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPoll = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 24"
    width="24"
    height="24"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13.78 21.33H3.75q-1.56 0-2.64-1.1T0 17.58V7.53q0-1.56 1.1-2.64t2.64-1.11H10q.53 0 .9.38t.38.87-.39.89-.89.38H3.75q-.5 0-.89.36t-.36.87v10.05q0 .5.36.87t.9.36h10.02q.5 0 .87-.36t.38-.87v-3.77q0-.5.39-.87t.88-.38.87.38.36.87v3.77q0 1.56-1.1 2.65t-2.65 1.1m-3.56-5.24q-.7 0-1.18-.48l-3.32-3.32q-.48-.53-.48-1.2t.48-1.18 1.16-.48 1.17.48l1.8 1.78 4.34-6.83q.33-.6 1-.8t1.28.13.8 1-.17 1.28l-5.41 8.75q-.44.87-1.47.87" />
  </svg>
);
export default SvgPoll;
