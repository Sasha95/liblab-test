import { MantineProvider } from '@mantine/core';
import { render, RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
