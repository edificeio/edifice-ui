import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgInteresting = ({
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
      fill="#FAEA9C"
      d="M19.5 8.042A7.447 7.447 0 0 0 11.752.601C7.945.748 4.789 3.873 4.61 7.68a7.4 7.4 0 0 0 1.805 5.231c.927 1.075 1.498 2.407 1.498 3.826v.448h7.909c0-1.535.65-2.966 1.688-4.09a7.4 7.4 0 0 0 1.99-5.059z"
    />
    <path
      fill="#D1AF00"
      d="M17.628 2.246C16.038.717 13.93-.07 11.728.005c-4.133.16-7.522 3.524-7.719 7.65a8.04 8.04 0 0 0 1.947 5.655c.871 1.007 1.35 2.229 1.35 3.432v.449c0 .331.27.601.602.601h7.908c.332 0 .602-.27.602-.601 0-1.308.547-2.616 1.529-3.678a8 8 0 0 0 2.149-5.465c0-2.21-.878-4.267-2.468-5.802M8.51 16.589c-.037-1.443-.62-2.886-1.646-4.07a6.8 6.8 0 0 1-1.658-4.815c.166-3.512 3.052-6.367 6.57-6.502 1.88-.086 3.654.596 5.017 1.903a6.78 6.78 0 0 1 2.1 4.937c0 1.732-.651 3.377-1.83 4.648-1.038 1.117-1.676 2.493-1.824 3.899H8.504z"
    />
    <path
      fill="#D1AF00"
      d="M15.823 16.46H7.914a.603.603 0 0 0-.602.602v2.382A4.56 4.56 0 0 0 11.868 24a4.56 4.56 0 0 0 4.556-4.556v-2.382a.603.603 0 0 0-.601-.602"
    />
    <path
      fill="#D1AF00"
      d="M13.784 18.124h-.902l.049-7.055H11.23v7.049h-.903v-7.049H9.314c-.387-.012-.915-.11-1.37-.497-.484-.411-.785-1.075-.803-1.768-.019-.639.208-1.216.632-1.615.675-.639 1.774-.762 2.56-.283.24.148.442.344.608.577.19.277.289.614.289.964v1.726h1.707l.012-1.707c0-.62.32-1.179.817-1.455.712-.387 1.522-.178 2.014.196.479.362.78 1.001.804 1.695s-.233 1.338-.682 1.725c-.331.283-.767.442-1.27.448h-.799l-.049 7.055zM9.26 7.508c-.313 0-.639.11-.866.332-.233.22-.362.552-.35.939.012.436.197.866.485 1.105.258.221.577.277.805.283h.994V8.44a.76.76 0 0 0-.135-.454 1.1 1.1 0 0 0-.331-.32 1.13 1.13 0 0 0-.602-.159m5.323.19a.73.73 0 0 0-.368.092c-.221.123-.362.387-.362.682l-.013 1.7h.786c.197 0 .48-.042.694-.226.24-.21.38-.596.368-1.014-.012-.43-.178-.804-.448-1.006a1.13 1.13 0 0 0-.657-.222z"
    />
  </svg>
);
export default SvgInteresting;
