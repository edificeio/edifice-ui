import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMatholycee = ({
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
    <path d="M7.1 21.52c-.08-.02-.08-.07-.05-.57.02-.46.02-.55-.03-.5-.02.02-.05.11-.05.28L7 21h-.55l-.03-.32c-.05-.36.03-.52.27-.72l.16-.12-.14-.1c-.1-.09-.12-.14-.14-.43 0-.19-.08-.43-.15-.6-.05-.14-.12-.31-.12-.36s-.02-.12-.07-.14c-.05-.03-.94-2.07-.99-2.31-.02-.07.12-.1.9-.1h.93l.1.27a8.4 8.4 0 0 1 .38 1.2s.12-.24.22-.58l.21-.57-.33-.12a3 3 0 0 1-.48-.27l-.2-.14.39-.75.58-1.15.19-.41.4-.12c.25-.07.42-.14.42-.17-.03-.02-.39.07-.68.2l-.12.02v-2.67l.12-.12c.1-.12.24-.14 1.57-.2l1.46-.02-3.1-.04-.02-.24c-.07-.8-.1-1.13-.05-1.23l.31-3.05c.15-1.62.3-3.01.3-3.13l.02-.2h3.07l.05.18c.03.12.1.93.2 1.85.09.89.23 2.35.35 3.24.15 1.35.2 1.66.34 2.12.07.29.15.6.15.67 0 .17.07.96.16 1.66l.05.36h.41c.36 0 .39.03.29.12a.9.9 0 0 1-.41.1c-.29 0-.29.02-.26.14l.07.44c.02.38.02.38-.72.45l-.58.03-.1-.24a1.4 1.4 0 0 1-.07-.44c.03-.21.03-.24-.12-.21-.07 0-.12.02-.07.02.05.03.07.17.07.5.03.25.03.49 0 .51 0 .05-.17.07-.36.07h-.36l-.02-.5-.03-.48-.31.05c-.39.07-.7.16-.55.16.21.03.07.17-.17.17-.2-.02-.22-.02-.1-.07.2-.12-.2-.02-.5.12-.58.24-.8.8-.5 1.3.28.53 1.2.96 2.5 1.18.52.07.6.07.42 0-.19-.1 1.62-.08 1.93 0 .58.16 1.59-.05 2.36-.5.16-.1.16-.13.12-.2-.12-.14-.05-.24.21-.24l.24-.02c.1 0 .3-.41.3-.56 0-.17-.15-.48-.2-.38-.03.02 0 .05.02.05s.03.02.03.07c-.05.1-.15.1-.15-.03 0-.1-.12-.19-.21-.19l.02.2c.02.12.03.2 0 .26-.05.1-.86.14-1.13.07-.2-.05-.21-.07-.24-.26v-.2h-.84v-1.3l.02-1.27.94-.02c1.28-.03 1.47.04 1.13.38-.12.1-.24.12-.6.12-.65 0-.65 0-.65.53 0 .46.03.5.12.36.05-.07.05-.07 0-.05-.07.05-.07 0-.07-.16v-.22h.55c.36 0 .5.02.46.07-.07.07-.07.07.02.05.05-.02.15-.05.22-.05s.12-.05.14-.2c.05-.26.15-.2.12.08 0 .03.05.05.12.03.08-.05.34-.08.56-.1.4-.05.5-.02.96.22h.05c-.05-.05-.05-8.95-.03-9.6l.03-.43h2.2v1.75c0 1.95 0 2.02.25 2.14.07.03.12 0 .17-.17.07-.19.07-.38.07-1.9V2.46l.29-.05c.4-.07 1.7-.07 1.82-.02l.12.07v4.69c0 2.6-.02 4.76-.02 4.83-.02.1-.14.12-.96.12-.58 0-.96-.04-1.06-.1l-.17-.06v-.6c0-.65-.02-.63.41-.75.3-.1.3-.1.32-.31v-.24l-.73-.1v-.43c0-.46-.02-.53-.19-.53-.1 0-.14.38-.12.89.03.26.03.36-.02.4-.03 0-.07.22-.12.44-.05.36-.07.65-.05 1.92v1.5l-.1.04c-.12.05-1.1 0-1.1-.07 0-.02-.03-1.2-.03-2.62 0-2.98-.07-2.64.58-2.64.24 0 .43-.03.43-.08 0-.02.03-.12.03-.19.02-.1-.03-.1-.5-.1-.8 0-.73-.23-.7 2.67 0 1.3 0 2.31-.03 2.26s-.02 0-.02.12c0 .32-.2.63-.58.99-.22.2-.4.34-.43.34s-.03.05.02.19l.05.2c-.02.04-1.15.28-1.18.23-.02 0-.21.05-.46.15l-.4.16 1.27.03c.7 0 1.4.02 1.54.05l.24.04v.46c0 .27 0 .48-.03.5l-.77.05-.74.05-.05.27c-.02.16-.02.3 0 .33 0 .03.34.08.72.1.68.05.68.05.72.22.05.1.05.33.05.48 0 .38-.05.38-.84.4h-.63v.25c-.02.14-.02.26 0 .26.03.02.05.12.05.24 0 .22 0 .22.24.27l.24.04-.02.27v.29l-.27.02c-.24.05-.26.05-.07.07.34.03.39.08.39.36v.27l-.32-.05c-.16-.02-.5-.05-.74-.05h-.46v-.33c0-.3 0-.34.1-.34h.1l-.1-.1a.64.64 0 0 1-.12-.31l-.03-.4c-.02-.15-.02-.15-.02.04 0 .22-.02.26-.12.26s-.1 0-.02.05c.1.03.12.27.04.36-.02.03-.02.08 0 .12s.05.22.05.39v.29l-.5-.05c-.72-.07-.7-.05-.7-.63 0-.26.02-.45.05-.45s.02-.7.02-1.9c0-1.71.03-1.9.07-1.97.08-.05.05-.05-.07-.03-.07.03-.31.07-.5.15-.22.04-.36.1-.32.1.22.02.46.69.46 1.24 0 .58.07.53-1.08.53h-1.04v-.4c0-.25-.02-.54-.04-.68-.05-.22-.08-.24-.17-.24a.46.46 0 0 0-.24.07l-.1.07v1.64c-.02 1.6-.02 1.66-.12 1.78-.1.14-.1.14 0 .14.05 0 .07.05.07.22v.24h-.3c-.47 0-.92-.27-.78-.46.03-.02.03-.12 0-.29-.02-.14-.02-.6-.02-.99v-.72h-1.01v-.55c0-.29.02-.7.05-.87l.07-.36-.17-.02c-.34-.12-.36-.1-.62.55l-.46 1.01c-.12.22-.2.39-.17.39.07 0 .07.19-.02.33-.05.08-.08.2-.1.3-.02.16-.05.19-.2.19l-.16.02.17.05.14.05v1.1l-.29.03c-.26.02-.26.02-.3.24-.08.52-.23.21-.23-.49v-.4l.39-.05-.22-.03c-.16 0-.19 0-.24.17-.02.12-.04.46-.04.8 0 .57 0 .57-.1.57-.05 0-.1.05-.1.07 0 .1-.24.1-.38.03zm4.47-1.2c.02-.04 0-.07-.03-.07s-.07.03-.1.07c0 .05 0 .08.06.08.02 0 .07-.03.07-.08M7.3 19.24c-.02-.24-.05-.22-.05.05 0 .12.03.21.05.19s.02-.12 0-.24m4.02-2.6a2.3 2.3 0 0 0-.58 0c-.17 0-.02.03.29.03s.46-.03.29-.03m1.08-.07a.26.26 0 0 0-.2 0c-.07 0-.02.03.08.03.12 0 .17-.03.12-.03m-3.1-.07c-.05-.03-.1-.03-.12 0s0 .02.07.02.07-.02.05-.02m3.67 0c-.04-.03-.1-.03-.12 0s0 .02.08.02c.07 0 .1-.02.04-.02M9 16.43c-.04-.03-.12-.03-.14 0-.05 0-.02.02.07.02.07 0 .1-.02.07-.02m4.48 0c-.05-.03-.1-.03-.12 0-.03 0 0 .02.07.02s.1-.02.05-.02m-4.81-.1H8.5c-.02.03 0 .05.08.05.1 0 .11-.03.07-.05zm5.2.03a.07.07 0 0 0-.1 0c-.03 0 0 .02.04.02s.08-.02.05-.02zm-5.52-.13c-.07-.02-.16-.04-.24-.04s-.07 0 .03.04c.07.05.17.08.21.08.1 0 .1-.03 0-.08m5.82.03c-.02-.03-.07 0-.07.02-.02.03 0 .03.05.03s.05-.03.02-.05m-.84-.36a4.4 4.4 0 0 0-.8 0c-.2 0-.02.02.42.02s.62-.02.38-.02m2.53-.07c-.03-.03-.08-.03-.08 0-.02.02 0 .04.05.04s.05-.02.03-.04M9.2 12.94a.15.15 0 0 0-.15 0c-.05 0 0 .02.07.02s.12-.02.08-.02m.28-.1h-.14c-.05.03 0 .05.07.05.1 0 .12-.02.07-.05m1.74 0h-.17c-.03.03 0 .05.1.05s.11-.02.07-.05m-1.38-.07h-.16c-.05.03 0 .05.1.05s.11-.02.07-.05zm.8-.12c.24-.05.36-.1.31-.1-.12-.02-.14-.04-.17-.3l-.02-.32-.2.02c-.23 0-.42.22-.42.5 0 .15-.03.22-.08.25-.14.07.17.05.58-.05m1.83.05h-.24c-.08.02 0 .02.12.02.14 0 .19 0 .12-.02m2.86-.14c-.03-.03-.05-.03-.07 0 0 .02.02.04.04.04.05 0 .08-.02.03-.04m-3.56-1.11c0-1.1-.02-1.44-.1-1.44 0 0-.02.55-.02 1.22v1.23l-.14.02c-.1.03-.08.03.07.05h.19zm.72.96c-.07-.02-.2-.02-.27 0s0 .02.15.02c.14 0 .2 0 .12-.02m-1.9-3c0-.03-.02-.75-.1-1.62-.04-.84-.12-1.54-.12-1.54s-.07.63-.11 1.4c-.08.74-.15 1.44-.15 1.56-.02.17-.02.2.07.24.1.03.39 0 .41-.04m7.8 11.7c-.1-.16-.13-.52-.06-.6.03-.04.03-.1 0-.19-.07-.21-.04-.26.15-.43.19-.2.67-.22.77-.07.02.07.05-.34.05-1.8 0-1.04 0-1.95.02-2.05l.02-.17h1.62c.89 0 1.73.03 1.85.05l.24.05v.46c0 .45 0 .45-.12.5-.08.02-.41.05-.75.05-.6 0-.65.02-.67.14-.03.07-.05.22-.05.34 0 .14.02.17.22.21.1.03.43.05.7.05h.47l.08.27.04.5c-.02.3-.07.32-.86.34-.5 0-.6.02-.63.12-.04.2-.02.4 0 .4s.05.1.05.22c0 .22.03.22.22.27l.21.05v.57l-.24.03c-.16 0-.19 0-.1.02.42.07.44.1.44.39v.26l-.31-.04c-.17-.05-.53-.05-.8-.05l-.45.02v-.34c0-.24.02-.3.07-.33l.1-.05-.1-.1c-.05-.07-.07-.19-.07-.38 0-.15-.03-.22-.03-.15-.02.08-.07.15-.14.15s-.1 0 0 .05c.1.02.1.02.05.26q-.045.18 0 .24c.02.03.04.17.04.34v.31l-.52-.05c-.41-.02-.53-.02-.53.05 0 .1-.08.12-.6.22-.08.02-.1-.03-.1-.15-.02-.24-.1-.21-.14.03-.05.21-.05.21-.15 0zm.69-.4h-.29c-.05.02 0 .04.17.04.14 0 .21-.02.12-.04m3.3.45c-.08-.1-.08-.16-.08-.5 0-.2 0-.43-.02-.48-.03-.1.02-.17.17-.3.16-.13.24-.16.5-.13l.29.02v.89l-.31.05-.3.02.34.03c.3 0 .37.04.39.12.05.21.02.24-.24.28l-.34.1c-.1.05-.12 0-.14-.22l-.05-.24-.07.24c-.05.24-.05.24-.14.12M8.1 20.95c0-.17.03-.17.22-.17.17 0 .2 0 .2.17 0 .19-.03.19-.2.19-.2 0-.22 0-.22-.2zm-5.14-.3c0-.18 0-.33.02-.33s.05-.1.05-.21c0-.15-.02-.22-.07-.22s-.05.1-.05.43v.46h-.24c-.22 0-.24-.02-.29-.17s-.05-.14-.1-.05c-.04.15-.72.24-.93.12-.2-.1-.24-.21-.15-.45.05-.15.07-.46.07-2.12 0-1.08 0-2.04.03-2.14l.02-.17 1.04.03h1.03v1.58c0 1.5 0 1.6.07 1.6.1 0 .2.13.22.28 0 .05-.05.12-.17.2-.17.06-.1.06.6.11.53.03.77.07.8.12 0 .05.04.07.1.07.14 0 .18.22.18.68v.38h-.64c-.37.03-.77.03-.9.03s-.21.02-.21.04c0 .05-.12.08-.24.08h-.24v-.34zm-1.08-1.5c0-.17 0-.17-.15-.08s-.12.22.03.22c.1 0 .12-.05.12-.15zm8.77 1.65a1.8 1.8 0 0 1-.38-.26c-.27-.24-.34-.5-.39-1.35l-.02-.65.53.03.5.02.03 1.15c0 .65-.03 1.18-.03 1.16zm1.73-.05c-.04-.3 0-1.2.05-1.22.03-.03.05.02.05.12 0 .24.1.34.29.26.1-.02.17-.04.2-.07.04-.07 0-.26-.1-.26-.05 0-.08-.05-.08-.41v-.41h.68v.38c0 .3.02.37.07.37.07 0 .07-.05.07-.27-.02-.22 0-.29.07-.4s.17-.15.67-.15c.51 0 .56.02.56.14 0 .24-.05.46-.1.46-.02 0-.05.02-.05.07.03.02 0 .22-.02.4-.07.35-.07.35-.24.3-.12-.03-.14-.03-.14.07 0 .14-.17.39-.34.46a.55.55 0 0 0-.22.19.33.33 0 0 1-.26.14c-.17 0-.2-.02-.2-.21v-.2l-.09.2c-.12.19-.14.21-.48.21-.36 0-.36-.02-.39-.16zm-10-6.08c-.1-.17-.12-.21-.12-1.1v-.92h1.1v.9c0 .47-.02.98-.04 1.07-.05.22-.05.22-.46.22-.33 0-.4-.02-.48-.17m18.59-.05c-.1-.04-.1-.07-.07-.81v-1.43h2.23v.57l-.02.82-.02.24h-1.33l.03.24c.02.41 0 .43-.39.41-.2 0-.38-.02-.43-.05zm-15.51-.14c-.03-.03-.03-.46-.03-.99v-.96h.94c.53 0 .99.02 1.01.07.03.03.03.22.03.48l-.03.46-.29.24c-.16.14-.36.36-.43.5l-.1.25h-.55c-.29 0-.53 0-.55-.05m-.87-.27c-.12-.12-.21-.16-.53-.19L3.68 14v-.2c0-.09-.07-.67-.17-1.27-.12-.89-.17-1.25-.2-2.06a6.8 6.8 0 0 0-.2-2.05L2.97 8v.34c0 .3 0 .36-.1.4-.11.08-1.8.08-1.82 0-.03-.02-.05-5.55-.03-6.34 0-.1.49-.12 1.88-.03l.91.05.17 1.5c.36 3.17.36 3.17.41 1.84.03-.36.05-.77.07-.89l.15-1.25.12-1.03.12-.12c.12-.1.36-.12 1.42-.14 1.03-.03 1.27 0 1.27.07.03.53 0 6.18-.02 6.2-.03.07-1.45.12-1.66.05l-.24-.05v-.84l-.03.38c-.02.22-.04.41-.07.46 0 .03-.17.07-.33.07-.49.05-.49.3 0 .32h.24l-.03.24c-.05.3-.17.55-.31.62-.31.12-.27.31.05.31.21 0 .24.03.24.15-.03.07-.1.84-.2 1.73-.26 2.57-.24 2.36-.36 2.36-.04 0-.16-.08-.24-.17zm.03-4.56c.02-.1-.1-.15-.48-.15-.3 0-.34.03-.34.1 0 .1.05.12.38.12.22 0 .41-.03.44-.07M1.44 14.2l-.19-.1-.02-2.32c0-1.28-.03-2.36 0-2.38 0-.03.43-.05.98-.05h.99v2.88h-.96l-.05.34a8 8 0 0 0-.05.82c0 .29 0 .55-.02.6-.05.12-.32.31-.41.31-.03 0-.15-.05-.27-.1m7.24-.26c0-.12.2-.36.41-.48.12-.07.31-.12.5-.12.34 0 .37.02.27.43l-.02.24h-.58c-.34 0-.58-.02-.58-.07m-1.18-.5c0-.15.08-.17.17-.1.07.05.07.07.03.07-.03 0-.1.02-.12.05s-.08 0-.08-.03zm.22-.46.07-.96c.05-.41.07-.68.1-.65.02 0 .07.24.12.5.04.41.07.53.02.94-.05.46-.05.46-.2.46s-.14 0-.11-.3zm-2.14-.94c-.03-.02-.03-.74-.03-1.56V8.97h.94c.56 0 .94.03.96.07 0 .05.03.72.03 1.54v1.47l-.94.02c-.5 0-.94 0-.96-.02zm10.87-.67-.1-.17h-1.92l-.05-.27c-.02-.14-.07-.28-.07-.33s.24-.07.67-.07c.36 0 .67-.03.72-.05s.05-.17.05-.68c0-.4.02-.62.05-.62.05 0 .05-.07.02-.27-.02-.16-.05-.67-.07-1.13l-.02-.86v1.2c0 .65-.03 1.4-.03 1.66l-.02.46h-1.44l.02-2.02c0-1.13.02-2.34.05-2.67l.02-.65-.2-.07c-.11-.05-.3-.1-.42-.12-.15-.03-.34-.1-.44-.12l-.19-.1V2.31h4.67l.04.65.03 1.04c0 .4 0 .43-.15.55-.1.1-.28.14-.6.17l-.48.04v4.21l-.07.05-.29.1-.21.07h.57v1.2c0 .65 0 1.18-.02 1.18s-.07-.07-.12-.2m-8.56-.3a3.8 3.8 0 0 1 .02-.93l.1.39c.04.29.07.38.02.5-.07.2-.1.2-.14.05z" />
  </svg>
);
export default SvgMatholycee;
