import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        className="!capitalize !text-white md:!hidden !text-sm !font-semibold"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Browse
        <ChevronDownIcon className="h-5 w-5" />
      </Button>
      <Menu
        className="menu"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Home</MenuItem>
        <MenuItem onClick={handleClose}>TV Shows</MenuItem>
        <MenuItem onClick={handleClose}>Movies</MenuItem>
        <MenuItem onClick={handleClose}>New & Popular</MenuItem>
        <MenuItem onClick={handleClose}>My list</MenuItem>
        <MenuItem onClick={handleClose}>Browse by Language</MenuItem>
      </Menu>
    </div>
  );
}
