import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCongratsCounter = ({
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
      fill="#C8E4AF"
      d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12"
    />
    <path
      fill="#4E9019"
      d="M17.736 13.37a16.4 16.4 0 0 0-1.73-3.237 1.5 1.5 0 0 0-.218-.25L14.264 8.48a.69.69 0 0 0-.606-.171.69.69 0 0 0-.497.387c-.082.175-.12.36-.113.541L10.514 6.9a1 1 0 0 0-1.675.703l-.024-.021a.98.98 0 0 0-.716-.264.98.98 0 0 0-.695.322 1 1 0 0 0-.264.716v.055a.9.9 0 0 0-.349-.048.97.97 0 0 0-.692.322 1 1 0 0 0-.263.715.97.97 0 0 0 .322.692l.462.425c-.274.03-.524.171-.692.394-.305.404-.233 1.003.158 1.363l3.568 3.288c.206.191.428.37.661.527l1.055.723c.164.112.336.215.507.311l1.28.695a3.33 3.33 0 0 0 1.596.408 3.35 3.35 0 0 0 2.596-1.233c.84-1.03.987-2.459.387-3.623"
    />
    <path
      fill="#fff"
      d="m11.517 13.524-3.78-3.483a.827.827 0 0 1 1.12-1.216l3.893 3.61L9.435 9.36a.827.827 0 0 1 1.12-1.216l3.78 3.483.83.763-1.47-1.352a.99.99 0 0 1-.222-1.15.53.53 0 0 1 .835-.162l1.524 1.404c.072.069.137.14.195.223q.216.314.432.657c.551.887.966 1.75 1.28 2.542a3.172 3.172 0 0 1-4.336 4.236l-1.28-.695a6 6 0 0 1-.493-.302l-1.055-.722a6 6 0 0 1-.643-.51L6.366 13.27c-.318-.295-.397-.788-.137-1.134a.826.826 0 0 1 1.223-.113l2.736 2.51.196.178-3.946-3.623a.827.827 0 0 1 1.12-1.216l3.867 3.562"
    />
    <path
      fill="#5AC235"
      d="M18.051 14.421a16.6 16.6 0 0 0-1.75-3.27q-.103-.149-.243-.281l-1.524-1.404a.872.872 0 0 0-1.376.264 1.2 1.2 0 0 0-.093.26l-2.284-2.106a1.168 1.168 0 0 0-1.911.524 1.17 1.17 0 0 0-1.74.9 1.168 1.168 0 0 0-.932 2.02l.23.213a1.2 1.2 0 0 0-.483.377c-.356.473-.277 1.171.178 1.592l3.569 3.288c.212.195.442.38.681.545l1.055.722q.258.175.52.319l1.281.695a3.51 3.51 0 0 0 4.408-.87c.88-1.082 1.041-2.579.414-3.795zm-4.493 4.062-1.28-.695a5 5 0 0 1-.463-.285l-1.055-.722a5 5 0 0 1-.602-.48l-3.569-3.287c-.199-.185-.243-.483-.096-.675a.49.49 0 0 1 .343-.195h.044a.47.47 0 0 1 .329.13l2.931 2.688a.345.345 0 0 0 .483-.02.344.344 0 0 0-.02-.483l-3.945-3.623a.46.46 0 0 1-.155-.336.47.47 0 0 1 .127-.346.46.46 0 0 1 .332-.154.46.46 0 0 1 .35.127l.113.102c.02.025.044.045.068.069l3.781 3.483c.069.061.16.092.247.089a.341.341 0 0 0 .219-.592l-.065-.059s-.02-.024-.035-.034L7.921 9.76a.486.486 0 0 1 .692-.678l3.89 3.61a.337.337 0 0 0 .483-.017.342.342 0 0 0-.017-.486L9.651 9.112a.46.46 0 0 1-.154-.336.5.5 0 0 1 .126-.349.49.49 0 0 1 .685-.027l4.61 4.246a.37.37 0 0 0 .246.093.341.341 0 0 0 .216-.593l-1.47-1.356a.65.65 0 0 1-.146-.753.18.18 0 0 1 .13-.103.2.2 0 0 1 .16.045l1.525 1.404a1 1 0 0 1 .144.164 15.88 15.88 0 0 1 1.688 3.161 2.828 2.828 0 0 1-3.87 3.777z"
    />
    <path
      fill="#fff"
      d="M6.856 4.64v-.006c-.12-.237-.311-.363-.548-.35a.63.63 0 0 0-.54.4c-.08.217-.015.443.18.628 0 0 .987.815 1.004.832a.24.24 0 0 0 .161.061.26.26 0 0 0 .154-.05.246.246 0 0 0 .086-.302l-.504-1.21z"
    />
    <path
      fill="#5AC235"
      d="M5.688 6.15a.58.58 0 0 0-.67-.105.58.58 0 0 0-.35.578c.01.161.082.308.202.418.11.1.25.154.407.154h.045c.034-.007.13-.01.243-.014.5-.017.682-.03.733-.136a.28.28 0 0 0 .051-.165.25.25 0 0 0-.082-.185l-.575-.544z"
    />
    <path
      fill="#4E9019"
      d="M8.61 4.048a.605.605 0 0 0-.518.692c.01.034.018.13.031.243.055.497.083.678.192.72a.25.25 0 0 0 .14.04h.028a.27.27 0 0 0 .178-.096l.5-.616a.59.59 0 0 0 .055-.678.58.58 0 0 0-.603-.305z"
    />
    <path
      fill="#fff"
      d="M17.983 6.22c.168-.203.202-.436.096-.641a.63.63 0 0 0-.586-.325c-.23.017-.407.17-.496.424l-.343 1.26a.245.245 0 0 0 .123.292.25.25 0 0 0 .127.034.23.23 0 0 0 .182-.082l.893-.956.007-.007z"
    />
    <path
      fill="#5AC235"
      d="M15.267 5.051a.606.606 0 0 0-.25.829c.02.034.065.123.117.226.222.442.308.603.424.603q.025.006.055.007c.11 0 .212-.069.25-.178l.257-.75a.59.59 0 0 0-.182-.654.58.58 0 0 0-.67-.08z"
    />
    <path
      fill="#4E9019"
      d="M19.243 7.572a.61.61 0 0 0-.846-.185c-.03.024-.116.075-.215.134-.425.253-.58.352-.569.469a.263.263 0 0 0 .195.287l.767.202a.6.6 0 0 0 .158.024.6.6 0 0 0 .483-.253.58.58 0 0 0 .03-.675z"
    />
  </svg>
);
export default SvgCongratsCounter;
