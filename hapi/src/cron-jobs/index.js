const mailApi = require('../utils/mail')
const {
  sponsorApi,
  lifebankApi,
  userApi,
  offerApi
} = require('../api')

const generateDonorsTransactionReports = async() => {
  var today = new Date()
  var yearAgo = new Date()
  yearAgo.setMonth(yearAgo.getMonth() - 12)
  const users = await userApi.getMany({
    role: { _eq: 'donor' }
  })
  users.forEach(async (donor) => {
    const report = await lifebankApi.getReport( { dateFrom: yearAgo, dateTo: today }, donor.account )
    mailApi.sendTransactionReport(
      donor.email,
      'Yearly report',
      'Report',
      'You have '.concat(report.notifications.sent.length,' sent transactions and ', report.notifications.received.length, ' received tokens by blood donation')
    )
  })
}

const generateSponsorsTransactionReports = async() => {
  var today = new Date()
  var monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  const users = await userApi.getMany({
    role: { _eq: 'sponsor' }
  })
  users.forEach(async (sponsor) => {
    const report = await sponsorApi.getReport( { dateFrom: monthAgo, dateFrom: today }, sponsor.account )
    mailApi.sendTransactionReport(
      sponsor.email,
      'Monthly report',
      'Report',
      'You have '.concat(report.notifications.received.length, ' received transactions')
    )
  })
}

const generateLifebanksTransactionReports = async() => {
  var today = new Date()
  var monthAgo = new Date()
  monthAgo.setMonth(monthAgo.getMonth() - 1)
  
  const users = await userApi.getMany({
    role: { _eq: 'lifebank' }
  })

  users.forEach(async (lifebank) => {
    const report = await lifebankApi.getReport( { dateFrom: monthAgo, dateTo: today }, lifebank.account )
    mailApi.sendTransactionReport(
      lifebank.email,
      'Monthly report',
      'Report',
      'You have '.concat(report.notifications.sent.length,' sent transactions and ', report.notifications.received.length, ' received transactions')
    )
  })
}

const generateNewSponsorAndOfferReportToLifebanks = async () => {
  var today = new Date()
  var weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)

  const lifebanks = await userApi.getMany({
    role: { _eq: 'lifebank' },
  })

  const newSponsors = await userApi.getMany({
    role: { _eq: 'sponsor' },
    created_at: { _gte: weekAgo, _lte: today }
  })

  const newOffers = await offerApi.getMany({
    created_at: { _gte: weekAgo, _lte: today }
  })

  lifebanks.forEach(async (lifebank) => {
    mailApi.sendNewSponsorAndOfferReport(
      lifebank.email,
      'Weekly new sponsors and offer report',
      'Report',
      'We have '.concat(newSponsors? newSponsors.length : 0, ' new sponsors and ', newOffers? newOffers.length : 0, ' new offers until last week')
    )
  })
}

const sendEmail = async() => {
  try {
    
    await mailApi.sendConfirmMessage(
      'leisterac.1997@gmail.com',
      'SUBJECT',
      'TITLE',
      'MESSAGE'
    )

    return {
      success: true
    }
  } catch (error) {
    console.log(error)
    return {
      success: false
    }
  }
}

module.exports = {
  sendEmail,
  generateDonorsTransactionReports,
  generateSponsorsTransactionReports,
  generateLifebanksTransactionReports,
  generateNewSponsorAndOfferReportToLifebanks,
}