import { CharacterType } from '@/shared/api/types';
import { Text, Title, Group, Stack, Badge, Card, Avatar } from '@mantine/core';
import { CustomLink } from '@/shared/ui/custom-link/CustomLink';
import { BackButton } from '@/shared/ui/back-button/BackButton';
import styles from './character.module.css';

type Props = {
  character: CharacterType;
};

export const Character = ({ character }: Props) => {
  const { name, race, gender, wikiUrl, spouse } = character;
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <>
      <BackButton />
      <Card shadow="md" padding="xl" radius="lg" withBorder className={styles.card}>
        <Group align="center" mb="md">
          <Avatar size={64} radius="xl" color="blue" alt={name}>
            {getInitials(name)}
          </Avatar>
          <Stack gap={0}>
            <Title order={2} size="h3" fw={700} c="blue.8" mb={'xs'}>
              {name}
            </Title>
            <Group gap="xs">
              {race && (
                <Badge color="gray" variant="light" radius="sm" size="sm">
                  {race}
                </Badge>
              )}
              {gender && (
                <Badge color="indigo" variant="light" radius="sm" size="sm">
                  {gender}
                </Badge>
              )}
            </Group>
          </Stack>
        </Group>
        <Stack gap="xs" mb="sm">
          {spouse && (
            <Text size="sm" c="dimmed">
              <b>Spouse:</b> {spouse}
            </Text>
          )}
        </Stack>
        {wikiUrl && (
          <Text size="sm">
            <CustomLink href={wikiUrl} target="_blank">
              Wiki
            </CustomLink>
          </Text>
        )}
      </Card>
    </>
  );
};
