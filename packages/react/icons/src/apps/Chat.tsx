import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgChat = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 24"
    width="24"
    height="24"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M28.35 11.71q0 3.03-1.9 5.6t-5.17 4.1-7.12 1.49q-2.93 0-5.62-.94l.04.07L0 24.6q1.06-1.42 1.7-3.03t.75-2.55l.1-.91Q0 15.22 0 11.71q0-3.03 1.9-5.6t5.17-4.06 7.1-1.5 7.11 1.5 5.17 4.06 1.9 5.6m-6.01 0q0-.7-.5-1.2t-1.23-.5q-.7 0-1.2.5t-.5 1.2q0 .72.5 1.23t1.2.5q.72 0 1.23-.5t.5-1.23m-6.01 0q0-.7-.5-1.2t-1.23-.5q-.7 0-1.2.5t-.51 1.2q0 .72.5 1.23t1.2.5q.73 0 1.23-.5t.5-1.23zm-6.01 0q0-.7-.5-1.2t-1.24-.5q-.7 0-1.2.5t-.5 1.2q0 .72.5 1.23t1.2.5q.73 0 1.23-.5t.5-1.23z" />
  </svg>
);
export default SvgChat;
