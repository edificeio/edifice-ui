import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgForum = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M18.9 10.85q0 1.85-1.27 3.44t-3.44 2.5-4.74.91q-1.15 0-2.36-.22-1.68 1.18-3.72 1.74-.5.12-1.16.21h-.05q-.14 0-.28-.12t-.15-.29q-.02-.02-.02-.07t.02-.1.03-.07l.02-.07.05-.07.05-.07.07-.07.05-.05.3-.34q.24-.27.37-.38t.29-.41.34-.5.26-.61q-1.66-.96-2.6-2.36t-.96-3q0-1.88 1.28-3.47t3.43-2.5 4.74-.91 4.74.91 3.44 2.5 1.27 3.47m5.15 3.41q0 1.61-.97 3.03t-2.6 2.36q.13.34.27.6t.34.5.31.4.34.4.31.34l.05.04.07.08q.03.02.05.07t.05.07l.02.07.03.07.02.1-.02.07q-.05.2-.17.32t-.29.1q-.67-.1-1.15-.23-2.07-.55-3.76-1.73-1.2.22-2.35.22-3.63 0-6.33-1.78.77.07 1.18.07 2.16 0 4.14-.6t3.56-1.73q1.65-1.25 2.57-2.86t.89-3.4q0-1.03-.32-2.04 1.74.94 2.75 2.38t1 3.08z" />
  </svg>
);
export default SvgForum;
