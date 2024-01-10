import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTextColor = ({
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
    <path
      fill="currentColor"
      d="M5.74 19.2a.91.91 0 0 1-.839-.473 1.01 1.01 0 0 1-.043-.99l6.153-14.649q.28-.688.946-.688.71 0 .968.688l6.174 14.692a.97.97 0 0 1-.086.968q-.28.452-.84.452-.279 0-.537-.15a1.05 1.05 0 0 1-.387-.474l-5.572-13.68h.624l-5.614 13.68a.92.92 0 0 1-.387.473q-.258.15-.56.151m1.248-4.832.796-1.7h8.54l.774 1.7zM2 21.4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"
    />
  </svg>
);
export default SvgTextColor;
