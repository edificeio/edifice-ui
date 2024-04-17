import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTimelinegenerator = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 24"
    width="24"
    height="24"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M12.5 18.09q1.2 0 2.05.84t.84 2.04-.84 2.05-2.04.84q-1.93 0-2.65-1.78H5.92q-2.12 0-3.15-1.3t-1.04-2.84V6.78Q0 5.96 0 4.14q0-1.2.84-2.05t2.05-.84 2.04.84.84 2.05q0 1.83-1.73 2.64v2.74q0 1.88 1.88 1.88h3.94q.72-1.73 2.65-1.73 1.2 0 2.04.84t.84 2.04-.84 2.05-2.04.84q-1.93 0-2.65-1.78H5.92q-1.01 0-1.88-.39v4.67q0 1.87 1.88 1.87h3.94q.73-1.73 2.65-1.73zm0-7.22q-.67 0-1.17.48t-.5 1.2q0 .68.5 1.16t1.18.48 1.17-.48.5-1.16q0-.72-.5-1.2t-1.17-.48zM1.2 4.14q0 .67.5 1.15t1.18.48 1.18-.48.5-1.15q0-.72-.5-1.2T2.9 2.46t-1.18.48-.5 1.2zM12.5 22.6q.68 0 1.18-.48t.5-1.16q0-.72-.5-1.2t-1.17-.48-1.18.48-.5 1.2q0 .67.5 1.16t1.17.48" />
  </svg>
);
export default SvgTimelinegenerator;
