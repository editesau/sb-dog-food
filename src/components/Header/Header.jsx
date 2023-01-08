import {
  AppBar, Container, Toolbar, TextField, InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeaderIcons from '../HeaderIcons/HeaderIcons'
import Logo from '../Logo/Logo'

const Header = () => {
  const auth = !!useSelector((store) => store.token.value)
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Container>
        <Toolbar>
          <Logo />
          {
          auth ? (
            <>
              <TextField
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <HeaderIcons />

            </>

          ) : (<Link to="signin" className="btn btn-primary">Login</Link>)
        }
        </Toolbar>

      </Container>
    </AppBar>
  )
}

export default Header
