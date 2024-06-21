import React, { ReactNode } from 'react';

export const RenderTheme = ({
  theme,
  children,
}: {
  theme: string;
  children: ReactNode;
}) => {
  return <div data-product={theme}>{children}</div>;
};
