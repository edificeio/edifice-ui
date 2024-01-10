import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMadmagz = ({
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
    <path d="M22.87 1.32a7.7 7.7 0 0 1-1.37.14c-.58.03-1.23.06-1.4.08a35 35 0 0 0-2.14.12c-.1.03-2.33.15-4.93.24-1.03.03-1.87.07-1.9.1 0 .02-.65.07-1.42.1s-1.42.04-1.44.07c-.05.02-.4.07-.87.1-2.52.09-3.75.16-3.8.2-.02 0-.67.06-1.41.08L.72 2.6c0 .02-.02.02-.02.02H.67c-.02 0-.02 0-.02.03v.5c-.03.89-.03 3.2-.03 9.52 0 6.06 0 8.5.03 9.43v1.47s0 .02.02.02H.8v.07h.5c.27 0 .51-.02.56-.05.02-.02.48-.07 1.01-.07.53-.02 1.3-.07 1.7-.1l1.33-.07c.31 0 .58-.02.62-.04.03-.03.87-.08 1.98-.1 1.05-.02 1.9-.05 1.9-.07s.67-.07 1.46-.1c.8-.02 1.45-.05 1.45-.07s.62-.07 1.37-.1c.77-.02 1.42-.04 1.46-.07s.49-.07.94-.07c.46 0 .84-.02.87-.05 0-.02.65-.07 1.42-.1.8 0 1.44-.04 1.46-.07.05-.02.6-.04 1.23-.07.65 0 1.2-.02 1.25-.02v-.12h.07V1.49s0-.02-.02-.02h-.2v-.1c-.02-.02-.14-.04-.28-.04zm-16 4.1.05.14c.05.1.08.24.08.33 0 .12 0 .22.04.22.03 0 .05.2.08.46s.07.5.1.53c.04.07.16.91.2 1.46 0 .24.06.44.08.44s.05.24.07.5c.03.29.07.53.1.53s.05.22.07.48c.02.27.07.48.1.48s.07.22.07.46c.02.26.07.5.1.55.04.1.23 1.42.23 1.7 0 .1 0 .18.05.18.03 0 .08.24.1.5l.05.5.07-.71.12-.82c.05-.12.14-.77.21-1.28.03-.14.05-.28.08-.3.02-.06.07-.4.1-.78.02-.4.04-.74.06-.77s.08-.29.1-.55c.02-.29.05-.5.07-.5s.07-.22.1-.49c0-.29.05-.53.07-.57a.64.64 0 0 0 .07-.32c.07-.55.2-1.27.24-1.34 0-.05.05-.3.07-.56l.05-.45h3.25v14.11h-2.3l-.02-4.28a687 687 0 0 0-.05-3.97c0 .17-.02.32-.07.32-.02 0-.05.24-.07.55s-.07.55-.1.55c-.02-.02-.05.15-.05.39-.02.38-.04.67-.16 1.35-.05.16-.1.52-.12.79l-.12.58c-.02.05-.08.3-.08.57-.02.3-.07.5-.1.5s-.04.25-.06.56c-.03.29-.08.6-.1.67-.02.05-.07.3-.07.5l-.07.66-.05.26h-1.1c-1.3.03-1.23.05-1.3-.62 0-.24-.05-.46-.08-.46-.02-.02-.07-.24-.1-.48s-.04-.46-.07-.48a2.6 2.6 0 0 1-.07-.7 3 3 0 0 0-.1-.67c-.04-.02-.07-.17-.07-.29 0-.14-.02-.26-.04-.26s-.08-.22-.1-.49c-.02-.26-.05-.48-.07-.48s-.07-.21-.1-.45a2.2 2.2 0 0 0-.07-.5A8 8 0 0 1 6 12.15c-.05-.48-.07-.7-.1-.8l-.05 4.04-.02 4.16H4.78c-.79.03-1.05 0-1.05-.05-.03-.04-.03-3.22-.03-7.07l.03-7h1.56l1.59-.02zm13.6.16V6.6c0 .92-.03 1.01-.13 1.25-.07.15-.12.31-.12.34 0 .05-.02.07-.04.07s-.05.02-.03.07c.03.03 0 .05-.02.07s-.07.1-.1.2c-.02.14-.14.43-.36.86l-.1.22c0 .02-.04.14-.1.24-.04.12-.09.26-.09.31s-.02.1-.05.1c-.02.02-.07.17-.12.29-.04.14-.1.26-.12.26s-.04.05-.04.1-.1.26-.2.5c-.12.24-.21.46-.21.48 0 .05-.05.2-.34.82l-.17.41-.14.31-.05.15c-.02.05-.12.26-.19.48-.07.2-.17.4-.22.48-.04.05-.07.14-.07.2s-.05.18-.12.3c-.19.41-.29.65-.29.7 0 .03-.05.15-.1.27l-.23.5-.2.46-.12.34v.14h2.02l2.05.02v1.93h-3.18c-1.75 0-3.2-.03-3.22-.03-.02-.02-.02-.48-.02-1 0-.78.02-1.02.07-1.09s.1-.17.1-.21c0-.08.02-.12.04-.12s.08-.03.08-.05a1 1 0 0 1 .1-.32l.11-.26.1-.29c.12-.22.2-.43.2-.5l.13-.27c.08-.12.15-.31.17-.4s.05-.18.07-.18c.03 0 .08-.12.12-.26.03-.15.15-.43.27-.67.1-.24.2-.46.2-.5s.02-.1.04-.1c.05 0 .07-.05.07-.1s.05-.17.1-.24.1-.15.07-.17v-.02l.02-.08c0-.03.05-.14.12-.28.2-.44.22-.5.2-.56l.04-.1c.03 0 .1-.16.17-.33s.15-.36.2-.43c.02-.05.07-.24.14-.39.05-.17.14-.36.19-.46l.17-.4c.05-.15.1-.24.12-.24s.05-.05.05-.1.02-.14.07-.22c.02-.07.07-.16.07-.21.02-.05.1-.27.22-.48.1-.22.16-.41.16-.44-.02-.04 0-.07.03-.1.05-.02.07-.09.1-.18l.04-.15h-1.92c-1.06 0-1.95-.02-1.97-.05s-.05-.45-.03-.96v-.91h3.1l3.08-.03z" />
  </svg>
);
export default SvgMadmagz;
