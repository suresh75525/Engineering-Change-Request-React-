import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
  return (
    <FormControl sx={{ m: 2, width: '97%',height:"50px" }}>
      <InputLabel htmlFor='outlined-adornment-amount' >Search</InputLabel>
      <OutlinedInput
        id='outlined-adornment-amount'
        onChange={(e) => props.onSearch(e.target.value.toLowerCase())}
        value={props.value}
        placeholder="Search Here..."
        startAdornment={
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        }
        label='Search'
      />
    </FormControl>
  );
};

export default SearchBar;