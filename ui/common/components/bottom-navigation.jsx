import React, { useState } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { useNavigate } from 'react-router-dom';


export function BottomNavigation() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MenuButton 
          as={Button} 
          onClick={handleMenuToggle}
        >
          Open Menu
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => alert('Sent mail')}>
            Sent mail
          </MenuItem>
          <MenuItem onClick={() => alert('Drafts')}>
            Drafts
          </MenuItem>
          <MenuItem onClick={() => alert('Inbox')}>
            Inbox
          </MenuItem>
          <MenuItem onClick={() => navigate('/user-page')}>
            <FaUser style={{ marginRight: 8 }} />
            User
          </MenuItem>
          <MenuDivider />
        </MenuList>
      </Menu>
    </div>
  );
}
