import { forwardRef, Ref } from 'react';

import clsx from 'clsx';

import usePaths from '../../core/usePaths/usePaths';

export interface LoadingScreenProps {
  position?: boolean;
  caption?: string;
}

const LoadingScreen = forwardRef(
  (
    { position = true, caption }: LoadingScreenProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const [imagePath] = usePaths();
    const image = `${imagePath}/loading/screen-loading.gif`;

    const containerClasses = clsx(
      'top-0 end-0 start-0 bottom-0 d-grid justify-content-center align-content-center align-items-center z-2000',
      {
        'position-fixed': !position,
        'position-static': position,
      },
    );

    const captionClasses = clsx('text-center pt-12', {
      'text-white': !position,
    });

    return (
      <>
        <div ref={ref} className={containerClasses}>
          <div className="bg-white rounded-circle mx-auto w-25">
            <img src={image} alt="loading" />
          </div>
          {caption && <div className={captionClasses}>{caption}</div>}
        </div>
        {!position && <div className="modal-backdrop fade show"></div>}
      </>
    );
  },
);

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;
