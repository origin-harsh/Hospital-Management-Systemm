import { ActionIcon, Button, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconLayoutSidebarLeftCollapseFilled } from '@tabler/icons-react';
import React from 'react'
import Sidebart from '../Admin/Sidebar/Sidebart';

const SideDraw = () => {
   const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        padding={0}
        size="auto"
        withCloseButton={false}

       

        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Sidebart/>
      </Drawer>

      <ActionIcon variant="transparent" size="lg" aria-label='Settings' onClick={open}>
            <IconLayoutSidebarLeftCollapseFilled style={{width:'90%', height:'90%'}} stroke={1.5} />
      </ActionIcon>
    </>
  )
}

export default SideDraw