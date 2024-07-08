import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgGuest = ({
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
      d="M11.999 17.571q-1.476 0-2.847.482a8.4 8.4 0 0 0-2.557 1.46.5.5 0 0 0 .106.246q.087.109.192.14h10.204a.4.4 0 0 0 .192-.14.5.5 0 0 0 .106-.247 7.8 7.8 0 0 0-2.528-1.46 8.7 8.7 0 0 0-2.868-.48m0-1.399q1.694 0 3.18.515t2.74 1.445V4.409a.3.3 0 0 0-.096-.212.3.3 0 0 0-.212-.096H6.388a.3.3 0 0 0-.211.096.3.3 0 0 0-.096.212v13.723q1.254-.93 2.74-1.445a9.6 9.6 0 0 1 3.178-.515m0-3.452q-.73 0-1.25-.52a1.7 1.7 0 0 1-.52-1.251 1.7 1.7 0 0 1 .521-1.25q.522-.52 1.251-.52.73 0 1.25.521.52.522.52 1.252a1.7 1.7 0 0 1-.522 1.249q-.52.52-1.25.52m-5.613 8.578q-.709 0-1.206-.498a1.64 1.64 0 0 1-.498-1.207V4.407q0-.71.498-1.207a1.64 1.64 0 0 1 1.206-.498h11.227q.71 0 1.207.498t.498 1.207v15.186q0 .71-.498 1.207a1.64 1.64 0 0 1-1.207.498zm5.617-7.179q1.318 0 2.242-.927a3.06 3.06 0 0 0 .924-2.245q0-1.318-.927-2.242a3.06 3.06 0 0 0-2.245-.924q-1.318 0-2.242.927a3.06 3.06 0 0 0-.924 2.245q0 1.318.926 2.242a3.06 3.06 0 0 0 2.246.924"
    />
  </svg>
);
export default SvgGuest;