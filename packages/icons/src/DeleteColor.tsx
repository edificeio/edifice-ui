import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgDeleteColor = ({
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
      d="M12.679 2.184a1 1 0 0 0-1.897 0c-.472 1.412-1.084 2.74-1.736 4.034l1.488 1.487c.407-.793.816-1.617 1.195-2.47.58 1.304 1.227 2.54 1.834 3.702q.396.753.758 1.464c.362.717.687 1.398.96 2.05l2.834 2.836c-.196-1.977-1.059-3.91-2.01-5.789a131 131 0 0 0-.81-1.568c-.962-1.841-1.936-3.705-2.616-5.746M17.082 19.91l-1.46-1.459c-.15.288-.332.555-.548.793-.644.707-1.677 1.256-3.344 1.256s-2.7-.549-3.345-1.256c-.666-.732-1.009-1.738-1.074-2.782-.096-1.547.44-3.163 1.31-5.012L7.123 9.952c-1.062 2.148-1.95 4.364-1.808 6.634.085 1.37.542 2.852 1.591 4.005C7.978 21.768 9.578 22.5 11.73 22.5c2.153 0 3.752-.732 4.823-1.91q.294-.324.529-.68"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2.793 2.793a1 1 0 0 1 1.414 0l17 17a1 1 0 0 1-1.414 1.414l-17-17a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDeleteColor;
