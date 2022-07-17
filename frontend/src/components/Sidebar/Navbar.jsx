import React, { useState } from 'react';
import { Navbar, Group, Code, ScrollArea, createStyles } from '@mantine/core';
import {
  Gauge,
} from 'tabler-icons-react';
import { BiDumbbell } from "react-icons/bi";
import { UserButton } from './UserButton';
import { LinksGroup } from './NavbarLinksGroup';

const mockdata = [
  { label: 'Dashboard', icon: Gauge },
  { label: 'Exercises', icon: BiDumbbell },
  { label: 'Dashboard', icon: Gauge },
  { label: 'Dashboard', icon: Gauge },
  { label: 'Dashboard', icon: Gauge },
//   {
//     label: 'Market news',
//     icon: Notes,
//     initiallyOpened: true,
//     links: [
//       { label: 'Overview', link: '/' },
//       { label: 'Forecasts', link: '/' },
//       { label: 'Outlook', link: '/' },
//       { label: 'Real time', link: '/' },
//     ],
//   },

];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function NavbarNested() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  const [opened, setOpened] = useState(false);
  return (
    <Navbar hiddenBreakpoint="md" hidden={!opened} height="100vh" width={{ sm: 250 }} p="md" className={classes.navbar} >
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <h1>GymBro</h1>
          <Code sx={{ fontWeight: 700 }}  color="pink">Support Us</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          name="Ann Nullpointer"
          email="anullpointer@yahoo.com"
        />
      </Navbar.Section>
    </Navbar>
  );
}