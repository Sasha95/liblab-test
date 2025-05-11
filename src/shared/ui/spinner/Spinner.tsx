import { Loader } from '@mantine/core';

export const Spinner = () => {
  return <Loader pos={'absolute'} top={'50%'} left={'50%'} color="blue" data-testid="spinner" />;
};
