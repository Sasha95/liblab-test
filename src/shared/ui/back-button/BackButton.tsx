'use client';

import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IconArrowLeft } from '@tabler/icons-react';

export const BackButton = () => {
  const { back } = useRouter();

  return (
    <Button
      variant="subtle"
      leftSection={<IconArrowLeft size={18} />}
      onClick={back}
      aria-label="Go back"
      mb="md"
    >
      Back
    </Button>
  );
};
