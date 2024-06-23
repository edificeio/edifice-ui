import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgHome = ({
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
      d="M12.614.21a1 1 0 0 0-1.228 0l-9 7A1 1 0 0 0 2 8v11a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a1 1 0 0 0-.386-.79zM16 20h3a1 1 0 0 0 1-1V8.49l-8-6.223-8 6.222V19a1 1 0 0 0 1 1h3v-9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1zm-6 0v-8h4v8z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgHome;
