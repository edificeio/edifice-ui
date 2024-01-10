import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgRetry = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 19 17"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m16.014 4.51.505-2.87a.83.83 0 1 1 1.635.289l-.844 4.79a.83.83 0 0 1-.961.673l-4.786-.845a.83.83 0 0 1 .288-1.635l2.751.485a6.46 6.46 0 0 0-7-3.545 6.46 6.46 0 0 0-5.267 6.02 6.47 6.47 0 0 0 4.617 6.534 6.454 6.454 0 0 0 7.427-2.967.83.83 0 1 1 1.437.83A8.12 8.12 0 0 1 6.48 16 8.12 8.12 0 0 1 .677 7.785 8.13 8.13 0 0 1 7.3.22a8.11 8.11 0 0 1 8.715 4.29"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgRetry;
