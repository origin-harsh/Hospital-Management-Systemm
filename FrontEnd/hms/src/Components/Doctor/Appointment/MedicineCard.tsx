import { Card, Text, Badge, Group, Divider } from "@mantine/core";
import { IconPill, IconClock, IconCalendar, IconNotes } from "@tabler/icons-react";

const MedicineCard = ({ medicine }: any) => {
  return (
    <Card  shadow="md" radius="xl" padding="sm" withBorder>
      
     
      <Group justify="space-between" mb="xs">
        <Group gap="xs">
          <IconPill size={18} />
          <Text fw={600} size="lg">{medicine.name}</Text>
        </Group>

        <Badge color="blue" variant="light">
          {medicine.type}
        </Badge>
      </Group>

      <Divider my="sm" />

      {/* Dosage & Frequency */}
      <Group justify="space-between" mb="xs">
        <Text size="sm">
          <b>Dosage:</b> {medicine.dosage}
        </Text>
        <Text size="sm">
          <b>Frequency:</b> {medicine.frequency}
        </Text>
      </Group>

      {/* Duration & Route */}
      <Group justify="space-between" mb="xs">
        <Text size="sm">
          <b>Duration:</b> {medicine.duration} days
        </Text>
      </Group>

      <Divider my="sm" />

      {/* Instructions */}
      <Group gap="xs">
        <IconNotes size={16} />
        <Text size="sm" c="dimmed">
          {medicine.instructions || "No special instructions"}
        </Text>
      </Group>

    </Card>
  );
};

export default MedicineCard;