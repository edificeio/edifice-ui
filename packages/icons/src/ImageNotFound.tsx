import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgImageNotFound = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 150 150"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M62.532 17.889a4.7 4.7 0 1 1-9.08 2.433 4.7 4.7 0 0 1 9.08-2.433m2.464 9.31a10.658 10.658 0 0 1-4.234 2.242 10.655 10.655 0 0 1-4.79.175l-4.557 22.27 28.663-7.68zm-17.34-5.324a10.65 10.65 0 0 0 2.79 4.82l-5.51 26.927-18.447 4.943c-8.002 2.144-12.75 10.37-10.607 18.371l13.284 49.575c2.144 8.002 10.369 12.751 18.371 10.607l78.515-21.038c8.002-2.145 12.751-10.37 10.607-18.372l-13.284-49.574c-2.144-8.002-10.369-12.751-18.371-10.607L86.557 42.47 68.322 21.905c.48-1.765.513-3.676.006-5.57-1.53-5.708-7.397-9.095-13.106-7.566-5.708 1.53-9.095 7.397-7.566 13.106M89.74 98.562a17.463 17.463 0 0 1-8.928 5.704c-9.358 2.507-18.976-3.046-21.484-12.404a17.46 17.46 0 0 1 .475-10.584zm3-5.196L62.802 76.082a17.46 17.46 0 0 1 8.929-5.703c9.357-2.508 18.976 3.046 21.483 12.403a17.461 17.461 0 0 1-.475 10.584m6.27-12.137c3.366 12.559-4.087 25.467-16.645 28.832-12.559 3.365-25.467-4.087-28.832-16.646-3.365-12.558 4.087-25.467 16.646-28.832 12.558-3.365 25.467 4.088 28.832 16.646m7.548-37.907L28.042 64.361a9 9 0 0 0-6.364 11.022l13.283 49.575a9 9 0 0 0 11.023 6.364l78.516-21.038a8.999 8.999 0 0 0 6.363-11.023L117.58 49.686a9 9 0 0 0-11.023-6.364"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgImageNotFound;
