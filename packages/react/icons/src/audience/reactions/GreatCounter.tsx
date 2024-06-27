import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgGreatCounter = ({
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
      fill="#FFB6C0"
      d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12"
    />
    <path
      fill="#fff"
      d="m12.527 6.291 1.51 3.062c.093.188.271.318.48.349l3.377.49c.524.075.733.719.353 1.085L15.8 13.661a.64.64 0 0 0-.185.565l.576 3.363a.637.637 0 0 1-.925.671l-3.02-1.589a.65.65 0 0 0-.593 0l-3.02 1.59a.637.637 0 0 1-.925-.672l.575-3.363a.64.64 0 0 0-.185-.565l-2.445-2.384a.637.637 0 0 1 .353-1.085l3.377-.49a.64.64 0 0 0 .479-.35l1.51-3.061a.639.639 0 0 1 1.144 0z"
    />
    <path
      fill="#FF3A55"
      d="M18.486 11.52a.97.97 0 0 0 .247-1.003.98.98 0 0 0-.791-.668l-3.377-.49a.3.3 0 0 1-.223-.16l-1.51-3.062a.981.981 0 0 0-1.757 0l-1.51 3.061a.3.3 0 0 1-.223.161l-3.376.49a.98.98 0 0 0-.791.668.97.97 0 0 0 .246 1.003l2.442 2.384a.3.3 0 0 1 .086.26l-.576 3.363a.979.979 0 0 0 1.421 1.034l3.021-1.589a.3.3 0 0 1 .274 0l3.02 1.59a.97.97 0 0 0 1.031-.076.98.98 0 0 0 .39-.959l-.575-3.363a.29.29 0 0 1 .086-.26zm-3.055 6.432-3.02-1.59a.98.98 0 0 0-.911 0l-3.02 1.59a.29.29 0 0 1-.312-.02.28.28 0 0 1-.117-.288l.576-3.363a.98.98 0 0 0-.281-.867L5.9 11.031a.29.29 0 0 1-.076-.302.28.28 0 0 1 .24-.198l3.377-.49a.99.99 0 0 0 .74-.534l1.51-3.062c.102-.209.424-.209.527 0l1.51 3.062c.144.287.418.49.737.534l3.376.49c.117.017.203.089.24.198.034.11.01.22-.075.302l-2.445 2.383a.98.98 0 0 0-.281.867l.575 3.363a.29.29 0 0 1-.116.287.29.29 0 0 1-.312.024z"
    />
  </svg>
);
export default SvgGreatCounter;
