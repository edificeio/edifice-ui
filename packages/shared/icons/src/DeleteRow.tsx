import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDeleteRow = ({
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
      fillRule="evenodd"
      d="M3 4.222C3 3.547 3.547 3 4.222 3h15.556C20.453 3 21 3.547 21 4.222V6h-3a1 1 0 1 0 0 2h3v11.778c0 .675-.547 1.222-1.222 1.222H4.222A1.22 1.22 0 0 1 3 19.778V8h3a1 1 0 0 0 0-2H3zm20 0v15.556A3.22 3.22 0 0 1 19.778 23H4.222A3.22 3.22 0 0 1 1 19.778V4.222A3.22 3.22 0 0 1 4.222 1h15.556A3.22 3.22 0 0 1 23 4.222m-12.768 7.096a1 1 0 1 0-1.414 1.414l1.768 1.768-1.768 1.767a1 1 0 1 0 1.414 1.415L12 15.914l1.768 1.768a1 1 0 0 0 1.414-1.414L13.414 14.5l1.768-1.768a1 1 0 1 0-1.415-1.414L12 13.086zM10 6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDeleteRow;
