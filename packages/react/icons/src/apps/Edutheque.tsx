import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgEdutheque = ({
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
    <path d="M11.97.5c-.07 0-.12.78-.12 2.1s.05 2.1.13 2.1c.07 0 .1-.78.1-2.1s-.03-2.1-.1-2.1zm4.19.7c-.07 0-.14.17-.34.77-.12.39-.43 1.2-.65 1.83-.24.65-.4 1.2-.4 1.28 0 .24.21-.08.28-.41a2 2 0 0 1 .17-.5c.17-.22 1.06-2.87.99-2.92-.03-.02-.03-.05-.05-.05m-8.32.05h-.05c-.05.05.05.46.22.92.19.45.5 1.32.72 1.92.21.58.43 1.06.48 1.06.07 0 .07-.07.05-.17a2.5 2.5 0 0 1-.15-.5 12.4 12.4 0 0 1-.6-1.59c-.45-1.35-.57-1.64-.67-1.64m-3.7 2.17c-.1 0 0 .12.45.65.08.07.56.65 1.1 1.3a8.7 8.7 0 0 0 1.1 1.17c.11 0-.06-.21-1.38-1.78a9 9 0 0 0-1.27-1.34m15.7 0c-.07 0-.46.38-.82.84s-.89 1.08-1.13 1.37c-.26.29-.53.6-.6.72-.27.48.14.1.94-.86.48-.6 1.08-1.3 1.32-1.57.27-.29.39-.5.29-.5m2.76 3.17c-.07 0-.29.1-.53.24-.24.17-.5.31-.52.31-.05 0-.3.12-.58.32-.27.17-.77.48-1.13.67-.39.2-.67.39-.67.43 0 .15.16.08 1.13-.5.53-.31.98-.58 1.03-.58.02 0 1.18-.67 1.32-.77.03-.02 0-.07-.02-.12h-.02zm-21.16.03c-.07 0-.07.04 0 .14.03.05.44.29.92.53.45.24 1.2.67 1.66.94.84.53.98.6.98.45 0-.04-.45-.36-1-.67-.58-.31-1.38-.77-1.76-1a2.5 2.5 0 0 0-.8-.4zm4.04.16-.19.27c-.14.21-.17.91-.17 5.14 0 4.84 0 4.89.24 5.13.22.19.48.21 2.62.24l2.38.04-.1.37c-.01.21-.13.52-.2.74-.15.36-.17.36-1.2.43-1.26.1-1.84.22-1.84.36 0 .2.7.3 2.5.39 2.63.14 2.67.14 4.89.02 2.26-.14 2.8-.21 2.76-.38-.07-.17-.58-.27-1.88-.39-1.12-.07-1.17-.12-1.34-1.03l-.1-.5 2.38-.05c2.34-.03 2.38-.03 2.6-.32.22-.24.22-.5.22-5.1 0-4.2-.03-4.88-.17-5.1l-.2-.26H5.49zm.68 1.61h11.2v7.3H6.16zm7.62.94c-.77 0-1.32 0-1.32.03l-.05.55-.03.48h4.4v-1l-2.16-.06zm-2.12.03H9.62c-1.13.02-2.12.04-2.19.1s-.12.28-.12.52v.41h3.25v.77h-3.2v1.01h3.2v.77H7.29l.1 1 1.99.03c1.1.03 2.07.03 2.16 0 .08-.02.17-.24.17-.45v-.39l.2.39.2.4 2.87.05.05-.53.05-.5h-2.46l-.29-.77h4.45v-1.01H14.6c-2.17 0-2.2-.02-2.67-.34-.56-.38-.56-.38-.34-.5.1-.07.12-.05.05.07-.07.1-.05.12 0 .1.07-.05.12-.32.07-.6zm-.74.8c.04 0 .16.06.24.18.07.1.57.48 1.08.87l.91.67-.48.07c-.26.05-.48.15-.48.22 0 .05.15.34.31.62.15.27.27.56.22.6-.02.05-.17.13-.29.17-.2.05-.29-.07-.55-.57l-.34-.65-.36.31-.39.31v-1.42c0-.77.05-1.39.13-1.39zm13 .38-.09.02c-.2.05-3.58.65-3.77.65-.05 0-.08.02-.03.1.07.11.07.11 3.3-.46.38-.08.72-.2.72-.24s-.05-.08-.12-.08zm-23.85 0-.05.02c-.16.14.17.31.58.26.24-.04.46-.02.5 0 .05.05.63.2 1.33.34 1.51.31 1.37.29 1.47.17.02-.07-.17-.15-.44-.2s-1.15-.19-1.92-.35c-.7-.15-1.3-.24-1.47-.24M11.5 12.6c.05 0 .08.05.08.15s-.1.19-.24.19c-.15 0-.27-.02-.27-.07 0-.03.12-.12.27-.2.07-.04.12-.07.16-.07m-7.6 1.42s-.02 0-.04.03c-.07.02-.65.14-1.3.24-1.4.19-2.33.4-2.48.53-.17.14.07.11 1.08-.08.49-.1 1.2-.21 1.6-.29 1.1-.21 1.2-.24 1.2-.36 0-.04 0-.07-.06-.07m16.33.05c-.07 0-.12.02-.12.05 0 .12.1.14 1.9.46.77.12 1.42.26 1.45.28s.19.05.36.05c.6 0-.05-.21-1.45-.45l-1.82-.34a2 2 0 0 0-.32-.05m-8.17 2.14h.07c.2.02.27.12.27.34s-.08.29-.27.31c-.29.05-.46-.2-.34-.5.03-.1.15-.15.27-.15m7.24.55c-.24 0-.1.2.3.44.4.19 1.9 1.08 2.65 1.51.3.17.41.17.41.05 0-.05-.16-.17-.33-.27-.2-.07-.9-.45-1.52-.81a11 11 0 0 0-1.3-.68c-.05 0-.1-.04-.1-.12 0-.04-.04-.12-.11-.12m-14.46.03a.7.7 0 0 0-.36.14c-.26.17-.96.6-2.28 1.32-.43.22-.75.46-.72.51s.31-.07.62-.24c.34-.2.63-.36.68-.36a6.5 6.5 0 0 1 1.13-.67L4.7 17c.08-.07.17-.07.22-.04.02.04.07.02.07-.05 0-.1-.07-.14-.17-.12zm1.93 2.07c-.03 0-.05 0-.05.02-.15.2-2.07 2.43-2.3 2.7-.18.19-.3.38-.27.45.1.12 0 .22 1.2-1.25l1.25-1.5c.14-.18.26-.35.21-.4zm10.53.12h-.02c-.03.02.52.74 1.25 1.6.7.85 1.32 1.55 1.37 1.55.12 0 .12-.22 0-.27-.08-.02-.22-.17-1.3-1.49-.82-.99-1.2-1.4-1.3-1.4zm-2.43 1.27-.05.02c-.1.1.27 1.23.72 2.43.17.41.34.92.41 1.13.05.22.15.39.22.39.14 0 .14-.07-.41-1.59-.24-.62-.53-1.42-.62-1.73-.17-.5-.22-.65-.27-.65m-5.67 0c-.08 0-.12.14-.12.29 0 .17-.05.29-.1.29s-.14.21-.22.46a44 44 0 0 1-.96 2.6c-.1.26-.07.33.05.33.07 0 .2-.24.29-.5.07-.27.2-.68.29-.9.4-1.03.89-2.33.89-2.45 0-.05-.07-.12-.12-.12m2.76.58s-.02 0-.02.02c-.05.05-.12 3.46-.1 4.04.03.12.05.15.15.05.07-.07.12-.82.12-2.07-.03-1.59-.05-2.04-.15-2.04" />
  </svg>
);
export default SvgEdutheque;
