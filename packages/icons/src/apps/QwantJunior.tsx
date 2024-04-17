import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgQwantJunior = ({
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
    <path d="M22.05 19.07a1.3 1.3 0 0 1-.17-.35c-.05-.3.21-.56.36-.8a11.5 11.5 0 0 0 1.69-6.46 11.47 11.47 0 0 0-5.54-9.7 11.4 11.4 0 0 0-3.5-1.4c-1.32-.3-2.67-.37-4-.26A11.73 11.73 0 0 0 .06 10.6a12.2 12.2 0 0 0 1.8 7.8 11.04 11.04 0 0 0 6.06 4.63c.68.23 1.37.38 2.07.47a11.9 11.9 0 0 0 3.92-.03c.36-.06.71-.12 1.05-.21.28-.08.6-.13.71-.43a.84.84 0 0 0-.15-.7l-.41-.84c-.26-.5-.5-1.03-.77-1.54-.06-.15-.19-.26-.34-.3s-.3-.02-.43.02c-.17.04-.34.05-.5.1a7.77 7.77 0 1 1-.4-15.45 7.75 7.75 0 0 1 4.47 13.53c-.13.09-.23.2-.3.35a.56.56 0 0 0 .02.4l2.21 4.39c.11.22.23.56.45.7.17.07.36.09.54.07h3.4c.3 0 .54-.23.56-.55a.6.6 0 0 0-.07-.28c-.2-.41-.43-.8-.64-1.22z" />
  </svg>
);
export default SvgQwantJunior;
