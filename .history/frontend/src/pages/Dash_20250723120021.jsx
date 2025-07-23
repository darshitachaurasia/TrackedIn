import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

const Dash = () => {
  return (
    <div>
      <nav>
        <Menubar>
  <MenubarMenu>
    <MenubarTrigger>Home</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Dashboard <MenubarShortcut></MenubarShortcut>
      </MenubarItem>
      <MenubarItem>Lifecycle</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Task</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Streak</MenubarItem>
    </MenubarContent>
    <MenubarTrigger>AI AGENT</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        N<MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
      </nav>
    </div>
  )
}

export default Dash
