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
    
    <MenubarTrigger>AI AGENT</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Ai suggeston<MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>Post linkedin</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>team</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Get help</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
      </nav>
    </div>
  )
}

export default Dash
