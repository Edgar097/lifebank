import Dashboard from './Dashboard'
import NotFound from './NotFound'
import LandingPage from './LandingPage'
import Signup from './Signup'
import Donation from './Donation'
import Profile from './Profile'
import EditProfile from './EditProfile'

export default [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard
  },
  {
    name: 'notFound',
    path: '/not-found',
    component: NotFound
  },
  {
    name: 'signup',
    path: '/signup',
    component: Signup
  },
  {
    name: 'landingpage',
    path: '/',
    component: LandingPage,
    exact: true
  },
  {
    name: 'donation',
    path: '/donations',
    component: Donation
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile
  },
  {
    name: 'editProfile',
    path: '/edit-profile',
    component: EditProfile
  }
]
