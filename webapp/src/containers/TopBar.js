import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Box from '@material-ui/core/Box'
import { Link, useLocation, useHistory } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/Edit'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SettingsIcon from '@material-ui/icons/Settings'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTranslation } from 'react-i18next'

import LanguageSelector from '../components/LanguageSelector'
import Settings from '../components/Settings'
import Notification from '../components/Notification'
import LoginModal from '../components/LoginModal'

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none'
  },
  userIcon: {
    color: '#121212',
    width: 24,
    height: 24
  },
  userIconTransparent: {
    color: '#ffffff'
  },
  icon: {
    color: '#121212',
    width: 20,
    height: 20,
    marginRight: 10
  },
  menuItem: {
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#121212',
    height: '32px'
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
  },
  languageText: {
    color: '#121212',
    fontSize: '1rem',
    marginLeft: 3,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  },
}))

const Topbar = ({ user, onLogout }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openSettings, setOpenSettings] = useState(false)
  const theme = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const history = useHistory()

  const trigger = useScrollTrigger({
    target: window || undefined,
    disableHysteresis: true
  })

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  const useTransparentBG = isDesktop && !trigger && isHome

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const openSettingsEvent = () => {
    setOpenSettings(!openSettings)
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOnCloseSetting = () => {
    setOpenSettings(!openSettings)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    onLogout()
    history.push('/')
  }

  return (
    <Box className={classes.box}>
      {!user && <LanguageSelector />}
      {user && <Notification />}
      {user && (
        <>
          <IconButton onClick={handleClick}>
            <SettingsIcon
              alt="User icon"
              className={clsx(classes.userIcon, {
                [classes.userIconTransparent]: useTransparentBG
              })}
            />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose(1)}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem className={classes.menuItem}>
              <PersonIcon alt="User icon" className={classes.icon} />
              <Typography
                variant="h5"
                className={classes.languageText}
              >
                {user.account}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <Link to="/profile" className={classes.link}>
                <EditIcon alt="Edit icon" className={classes.icon} />
                <Typography
                  variant="h5"
                  className={classes.languageText}
                >
                  {t('navigationDrawer.editPage')}
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={openSettingsEvent} className={classes.menuItem}>
              <SettingsIcon alt="Settings icon" className={classes.icon} />
              <Typography
                variant="h5"
                className={classes.languageText}
              >
                {t('navigationDrawer.settings')}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} className={classes.menuItem}>
              <ExitToAppIcon alt="Logout icon" className={classes.icon} />
              <Typography
                variant="h5"
                className={classes.languageText}
              >
                {t('login.logout')}
              </Typography>
            </MenuItem>
          </Menu>
        </>
      )
      }
      { user && openSettings && < Settings onCloseSetting={handleOnCloseSetting} />}
      <LoginModal isNavBar />
    </Box >
  )
}

Topbar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func
}

export default memo(Topbar)
