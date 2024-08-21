import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCerise = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 24"
    width="24"
    height="24"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11.04 1.57c-.27.53-1.37 1.92-2.48 3.15-1.1 1.2-1.92 2.26-1.85 2.35.12.1 1.2-.86 2.43-2.16 1.37-1.42 2.28-2.19 2.35-1.95l.53 1.9c.22.84.53 1.73.7 1.9.24.31-.07.53-1.66 1.28-1.08.5-2.33.98-2.79 1.08-.48.07-.86.29-.86.43 0 .31 4.04-1.2 5.02-1.88.85-.62.8-.67 1.28 1.06.29.92.29.9.16-.26-.1-1.13-.04-1.25.85-1.95l.96-.7.82 3.2c.57 2.3.7 3.3.53 3.6-.44.73-3.76 2.36-5.92 2.94-1.88.5-4.5.96-4.5.75 0-.05 1.2-.87 2.72-1.86C11.78 12.85 14 10.7 14 9.93c0-.14-.3.17-.65.7-.34.53-1.45 1.56-2.43 2.26-2.07 1.56-6.76 4.02-7.8 4.06-1.03.1-.93.49.13.49 4.73 0 11.66-1.98 14.11-4.07l.77-.65-.89-3.8c-.48-2.06-.96-3.92-1-4.1-.1-.25-.59.04-1.5.83a13 13 0 0 1-1.51 1.23c-.1 0-.32-.7-.49-1.54-.7-3.3-1-4.52-1.1-4.62s-.36.32-.6.85m-5.75.84c0 1.66-1.23 3.97-3.15 6.06L.58 10.13l.82 3.27c.48 1.82.89 3.15.9 2.93.06-.2-.26-1.66-.66-3.3L.89 10.1l1.78-.89c.99-.45 2.28-1.25 2.89-1.78l1.1-.96-.48-2.38C5.65 1.35 5.3.7 5.3 2.41zm.6 3.32c.17.79-.48 1.53-2.04 2.38l-.75.4.5-.76C5.68 4.6 5.68 4.62 5.9 5.73zm-.26 3.96c-.48.05-.87.24-.87.39s.22.2.48.12c.34-.12.58.02.8.43.28.55.3.55.16.05-.1-.4.03-.63.46-.84.63-.3.46-.32-1.03-.15m1.51 2.82c-.36.6-1.27 1.78-2.07 2.62S3.7 16.64 3.8 16.64c.48 0 2.93-2.64 3.51-3.77.8-1.61.67-1.9-.17-.36m-5.7 7.33c-.86.5-1.17 1.08-1.17 2.24 0 1.66.55 2.23 2.16 2.23 1.1 0 1.3-.07 1.18-.43-.1-.21-.17-.43-.17-.46 0-.04-.31-.02-.72.05-1.28.24-1.9-1.51-.9-2.43.32-.29.73-.4 1.04-.31.34.12.58.02.68-.27.12-.24.14-.48.1-.52-.3-.32-1.74-.37-2.2-.1m2.8 2.5v1.98H5.4c.89 0 1.2-.1 1.2-.39 0-.24-.24-.4-.67-.4-.41 0-.65-.15-.65-.4 0-.21.24-.4.53-.4s.53-.2.53-.39c0-.21-.24-.4-.53-.4-.31 0-.53-.2-.53-.42 0-.33.2-.4.65-.33.5.12.67.02.67-.34 0-.43-.21-.5-1.2-.5H4.23v2zm2.9 0c0 1.78.05 1.98.53 1.98s.53-.2.53-1.6c0-.9.1-1.58.27-1.58.4 0 .62.77.28 1.13-.45.58.17 1.97.94 2.12.72.14.72.12.22-.9-.31-.55-.34-.88-.12-1.27.12-.29.26-.62.26-.8 0-.57-.89-1.07-1.87-1.07H7.14v2zm3.56 0c0 1.78.05 1.98.53 1.98s.53-.2.53-1.98c0-1.8-.05-2-.53-2s-.53.2-.53 2m2-1.6c-.5.6-.22 1.53.6 1.94.94.46.91.91-.05.8-.6-.08-.82 0-.91.35-.1.41.02.49.98.49 1.25 0 1.73-.34 1.73-1.25 0-.41-.29-.73-.96-1.11-.82-.41-.94-.55-.53-.67.24-.12.6-.15.82-.08.31.15.67-.28.67-.74 0-.31-2.07-.07-2.35.26zm2.88 1.6v1.98h1.2c.87 0 1.18-.1 1.18-.39 0-.24-.24-.4-.65-.4-.43 0-.67-.15-.67-.4 0-.21.24-.4.53-.4.36 0 .53-.2.53-.5 0-.37-.12-.49-.53-.37-.36.1-.53 0-.53-.29 0-.26.24-.43.67-.43.41 0 .65-.15.65-.39 0-.29-.31-.4-1.18-.4h-1.2v2z" />
  </svg>
);
export default SvgCerise;
