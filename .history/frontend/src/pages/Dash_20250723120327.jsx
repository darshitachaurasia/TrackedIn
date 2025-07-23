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
    
  </MenubarMenu>
</Menubar>
      </nav>
    </div>
  )
}

export default Dash
