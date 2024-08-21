import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgPublic = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 24"
    width="24"
    height="24"
    aria-hidden="true"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M9.76 2.82a9.66 9.66 0 0 1 9.74 9.71 9.67 9.67 0 0 1-9.74 9.76A9.72 9.72 0 0 1 0 12.53a9.71 9.71 0 0 1 9.76-9.71m.56 17.65c1.56 0 2.4-2.72 2.79-4.07-.94.1-1.86.15-2.8.17v3.9zm-3.1-1.97c.45 1.08 1.15 1.97 1.94 1.97v-3.9c-.91-.02-1.85-.07-2.76-.17.19.77.45 1.47.81 2.1zm-5.34-4.86c.38.45 1.37 1.05 3.17 1.37a17.8 17.8 0 0 1-.1-4.04 14 14 0 0 1-2.8-.77 8.3 8.3 0 0 0-.27 3.44m4.08-1.04c0 .9.05 1.8.17 2.62a22 22 0 0 0 3.03.32v-4.26a34 34 0 0 1-3.17-.2c0 .54-.03 1-.03 1.52m3.15-7.96c-1.34.56-2.5 2.65-2.98 5.42.99.1 2.02.14 3.03.19v-5.6h-.05zm1.98.44c-.27-.2-.56-.44-.77-.44v5.6a61 61 0 0 0 3.05-.19C13 7.9 12.12 6 11.1 5.08zm-.77 10.46c1.05-.05 2.04-.12 3.03-.3.14-.79.19-1.72.19-2.64 0-.53 0-.98-.05-1.49-1.01.1-2.07.15-3.17.17zm4.23-4.57a20.4 20.4 0 0 1-.1 4.09c3.13-.53 3.25-1.25 3.25-2.53a7.3 7.3 0 0 0-.36-2.28c-.56.24-1.59.6-2.8.72zm2.38-1.78a7.63 7.63 0 0 0-4.3-4.04c.9 1.18 1.46 2.84 1.77 4.78 1.61-.28 2.29-.57 2.53-.74M4.16 6.95A6.9 6.9 0 0 0 2.6 9.16c.26.24.72.27 2.47.75.34-1.93.92-3.51 1.8-4.71-1 .48-1.92.89-2.7 1.75zm0 11.18c.72.8 1.61 1.33 2.55 1.74a9.3 9.3 0 0 1-1.44-3.66c-1.2-.27-2.29-.6-3.01-.99a7.65 7.65 0 0 0 1.9 2.91m11.2 0a6.9 6.9 0 0 0 1.81-2.78c-.8.36-1.8.67-2.91.9a9.8 9.8 0 0 1-1.5 3.62c.95-.41 1.88-.94 2.6-1.74" />
  </svg>
);
export default SvgPublic;
