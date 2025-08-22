import { Card, Image, Text, Group, Button, AspectRatio } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useState } from 'react';
import styles from './ProductCard.module.css';
import { QuantityControl } from '../../ui/QuantityControl';
import { splitName } from '../../utils/splitName';
import type { Product } from '../../types';

export default function ProductCard({
  name,
  price,
  image,
  addToCart,
}: Product & { addToCart: (quantity: number) => void }) {
  const [quantity, setQuantity] = useState<number>(1);
  const { title, meta } = splitName(name);

  return (
    <Card
      withBorder
      shadow="xs"
      radius="xl"
      padding="lg"
      className={styles.card}
    >
      <Card.Section p="md" pb={0}>
        <AspectRatio ratio={1}>
          <Image src={image} alt={name} fit="contain" />
        </AspectRatio>
      </Card.Section>

      <Group
        justify="space-between"
        wrap="nowrap"
        align="center"
        mt="md"
        mb={6}
      >
        <Group gap={6} wrap="nowrap" style={{ minWidth: 0, flex: '1 1 67%' }}>
          <Text fw={600} lineClamp={1}>
            {title}
          </Text>
          {meta && (
            <Text c="dimmed" fz="sm" style={{ whiteSpace: 'nowrap' }}>
              {meta}
            </Text>
          )}
        </Group>
        <QuantityControl
          value={quantity}
          onChange={(next) => setQuantity(next)}
          min={1}
        />
      </Group>
      <Group justify="space-between" mt="xs">
        <Text fw={700}>${price}</Text>
        <Button
          color="brand"
          variant="light"
          rightSection={<IconShoppingCart size={16} />}
          onClick={() => addToCart(quantity)}
          className={styles.addBtn}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
}
