import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { NavbarNested } from './Navbar';

const SidebarLayout = () => (
  <>
    <AppShell
        styles={{
          main: {
            background: "#FFFFFF",
            
          }, 
        }}
        navbarOffsetBreakpoint="md"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={
          <NavbarNested/>
        }
      >
        {/* React Router dom will add all main pages here */}
        <Outlet />
    </AppShell>
  </>
);

export default SidebarLayout