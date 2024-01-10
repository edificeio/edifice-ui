import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgTextHighlight = ({
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
      d="M1 21.914a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M17.244 1.794A3.005 3.005 0 0 0 13 2L6.71 8.888a4 4 0 0 0-1.032 3.056l-3.03 6.115a1 1 0 0 0 .894 1.444l5.673.005a1 1 0 0 0 .523-.146l2.441-1.492a4 4 0 0 0 2.955-1.314l6.29-6.888a3.005 3.005 0 0 0-.193-4.245zm-5.397 14.047-.05-.081-.087.054a2 2 0 0 1-.884-.467l-2.508-2.283a2 2 0 0 1-.548-.837l.043-.087-.08-.04a2 2 0 0 1 .456-1.866l6.29-6.888a1 1 0 0 1 1.415-.068l3.987 3.629c.408.372.437 1.005.064 1.415l-6.29 6.888a2 2 0 0 1-1.808.63m-5.113-1.523q.111.118.233.23l2.508 2.283q.117.106.24.201l-.78.476-3.78-.003z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTextHighlight;
