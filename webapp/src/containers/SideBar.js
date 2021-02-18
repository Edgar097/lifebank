import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import InfoIcon from '@material-ui/icons/Info'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import { useTranslation } from 'react-i18next'

import LoginModal from '../components/LoginModal'
import CredentialsRecovery from '../components/CredentialsRecovery'
import Signup from '../components/Signup/Signup'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column'
  },
  optionLink: {
    width: '100%',
    display: 'flex',
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    '& a': {
      textDecoration: 'none'
    }
  },
  labelOption: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(3),
    fontSize: 14,
    textTransform: 'capitalize'
  },
  iconOption: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 20
  },
  iconDonor: {
    color: theme.palette.secondary.main,
    fontSize: 20
  },
  infoLabel: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(2),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 1.33,
    letterSpacing: '2px',
    margin: theme.spacing(2, 0, 4, 0)
  }
}))

const SideBar = ({ user, onLogout, triggerSideBarPosition }) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.optionLink}>
        <LoginModal isSideBar />
      </Box>
      <Box className={classes.optionLink}>
        <Signup isSideBar />
      </Box>
      {user && (
        <>
          <Box className={classes.optionLink}>
            <AccountCircleIcon className={classes.iconOption} />
            <Link to="/profile">
              <Typography variant="body1" className={classes.labelOption}>
                {`${user.role} ${t('profile.profile')}`}
              </Typography>
            </Link>
          </Box>
          {user.role === 'sponsor' && (
            <Box className={classes.optionLink}>
              <MenuBookIcon className={classes.iconOption} />
              <Link to="/offers-management">
                <Typography variant="body1" className={classes.labelOption}>
                  {t('offersManagement.offersManagement')}
                </Typography>
              </Link>
            </Box>
          )}
          <Box className={classes.optionLink} onClick={onLogout}>
            <LogoutIcon className={classes.iconOption} />
            <Typography variant="body1" className={classes.labelOption}>
              {t('logout')}
            </Typography>
          </Box>
        </>
      )}
      {!user && (
        <>
          <CredentialsRecovery
            overrideBoxClass={classes.optionLink}
            overrideLabelClass={classes.labelOption}
          />
        </>
      )}
      <Divider />
      <Typography variant="body1" className={classes.infoLabel}>
        {t('navigationDrawer.information')}
      </Typography>
      <Box className={classes.optionLink} onClick={() => triggerSideBarPosition()}>
        <InfoIcon className={classes.iconOption} />
        <Link to="/about">
          <Typography variant="body1" className={classes.labelOption}>
            {t('navigationDrawer.aboutLifebank')}
          </Typography>
        </Link>
      </Box>
      <Box className={classes.optionLink} onClick={() => triggerSideBarPosition()}>
        <InfoIcon className={classes.iconOption} />
        <Link to="/terms-of-use">
          <Typography variant="body1" className={classes.labelOption}>
            {t('navigationDrawer.useTerms')}
          </Typography>
        </Link>
      </Box>
      <Box className={classes.optionLink} onClick={() => triggerSideBarPosition()}>
        <InfoIcon className={classes.iconOption} />
        <Link to="/help">
          <Typography variant="body1" className={classes.labelOption}>
            {t('navigationDrawer.help')}
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

SideBar.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
  triggerSideBarPosition: PropTypes.func
}

export default React.memo(SideBar)
