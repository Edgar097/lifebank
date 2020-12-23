import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from 'react-i18next'

import MapSelectLocation from '../../components/MapSelectLocation'
import Schedule from '../../components/Schedule'
import { captchaConfig, constants } from '../../config'

const {
  LOCATION_TYPES: { LIFE_BANK }
} = constants

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  textField: {
    marginBottom: 10
  },
  textFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  boxCenter: {
    width: '100%',
    marginBottom: 15
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  btnContinue: {
    borderRadius: '50px',
    backgroundColor: '#ba0d0d',
    width: "70%",
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginTop: 10,
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  mapBox: {
    marginTop: theme.spacing(2)
  }
}))

const SignupLifeBank = ({
  onSubmit,
  setField,
  user,
  loading,
  isEmailValid,
  children
}) => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  const handleOnGeolocationChange = useCallback(
    (coordinates) => setField('coordinates', JSON.stringify(coordinates)),
    [setField]
  )
  const handleOnAddSchedule = useCallback(
    (data) => setField('schedule', JSON.stringify(data)),
    [setField]
  )
  const [recaptchaValue, serRecaptchaValue] = useState('')

  const marks = [
    {
      value: 1,
      label: t('editProfile.low')
    },
    {
      value: 2,
      label: t('editProfile.medium')
    },
    {
      value: 3,
      label: t('editProfile.high')
    }
  ]
  const valueLabelFormat = (value) => {
    switch (value) {
      case 1:
        return t('editProfile.low')
      case 2:
        return t('editProfile.medium')
      case 3:
        return t('editProfile.high')
      default:
        return 'N/A'
    }
  }

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        {children}
        <TextField
          id="password"
          label={t('signup.password')}
          type="password"
          fullWidth
          variant="outlined"
          className={classes.textField}
          onChange={(event) => setField('password', event.target.value)}
        />
        <TextField
          id="name"
          label={t('signup.name')}
          variant="outlined"
          fullWidth
          className={classes.textField}
          onChange={(event) => setField('name', event.target.value)}
        />
        <TextField
          id="description"
          label={t('common.description')}
          variant="outlined"
          fullWidth
          className={classes.textField}
          onChange={(event) => setField('description', event.target.value)}
        />
        <TextField
          id="address"
          label={t('signup.address')}
          variant="outlined"
          fullWidth
          className={classes.textField}
          onChange={(event) => setField('address', event.target.value)}
        />
        <TextField
          id="phoneNumber"
          label={t('signup.phoneNumber')}
          variant="outlined"
          fullWidth
          className={classes.textField}
          onChange={(event) => setField('phone', event.target.value)}
        />
        <TextField
          id="invitationCode"
          label={t('signup.invitationCode')}
          variant="outlined"
          fullWidth
          className={classes.textField}
          onChange={(event) => setField('invitation_code', event.target.value)}
        />
        <FormGroup className={classes.boxCenter}>
          <FormControlLabel
            control={
              <Switch
                id="hasImmunityTest"
                name="hasImmunityTest"
                color="primary"
                checked={user.immunity_test || false}
                onChange={() => setField('immunity_test', !user.immunity_test)}
              />
            }
            label={t('profile.hasImmunityTest')}
          />
        </FormGroup>
        <Box className={classes.boxCenter}>
          <Typography gutterBottom>{t('common.bloodUrgency')}</Typography>
          <Slider
            valueLabelDisplay="auto"
            valueLabelFormat={valueLabelFormat}
            onChange={(event, value) => setField('urgency_level', value)}
            marks={marks}
            step={null}
            min={0}
            max={4}
          />
        </Box>
        <Box className={classes.boxCenter}>
          <Schedule handleOnAddSchedule={handleOnAddSchedule} />
        </Box>
        <Box className={classes.boxCenter}>
          <Typography gutterBottom>
            {t('signup.chooseYourLocation')}
          </Typography>
          <MapSelectLocation
            onGeolocationChange={handleOnGeolocationChange}
            markerType={LIFE_BANK}
            width="100%"
            height={400}
            mb={1}
          />
        </Box>
        <Box className={classes.btnWrapper}>
          <ReCAPTCHA
            sitekey={captchaConfig.sitekey}
            onChange={(value) => serRecaptchaValue(value)}
          />
          <Button
            disabled={
              !isEmailValid ||
              !user.password ||
              !user.name ||
              !user.address ||
              !user.phone ||
              !user.schedule ||
              !user.coordinates ||
              !recaptchaValue ||
              loading
            }
            className={classes.btnContinue}
            variant="contained"
            color="secondary"
            onClick={onSubmit}
          >
            {t('miscellaneous.continue')}
          </Button>
          {loading && <CircularProgress />}
        </Box>
      </Box>
    </form>
  )
}

SignupLifeBank.propTypes = {
  onSubmit: PropTypes.func,
  setField: PropTypes.func,
  user: PropTypes.object,
  loading: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  children: PropTypes.node
}

SignupLifeBank.defaultProps = {}

export default SignupLifeBank
