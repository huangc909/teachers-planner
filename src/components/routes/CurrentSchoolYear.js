import React from 'react'

const CurrentSchoolYear = (props) => {
  const schoolYear = props.location.aboutProps.schoolYearInfo.sortedCurrSchoolYear
  console.log('schoolYear: ', schoolYear)
  const startYear = props.location.aboutProps.schoolYearInfo.startYear
  console.log('startYear: ', startYear)
  const endYear = props.location.aboutProps.schoolYearInfo.endYear
  console.log('endYear: ', endYear)
  const todaysYear = props.location.aboutProps.yearInfo.todaysYear
  console.log('todaysYear: ', todaysYear)
  const leapYear = props.location.aboutProps.leapYear.leapYear
  console.log('leapYear: ', leapYear)
  const schoolYearMonthNumber = props.location.aboutProps.monthInfo.schoolYearMonthNumber
  console.log('schoolYearMonthNumber: ', schoolYearMonthNumber)
  const todaysMonthName = props.location.aboutProps.monthInfo.todaysMonthName
  console.log('todaysMonthName: ', todaysMonthName)
  const todaysMonthNumber = props.location.aboutProps.monthInfo.todaysMonthNumber
  console.log('todaysMonthNumber: ', todaysMonthNumber)
  const todaysDate = props.location.aboutProps.dateInfo.todaysDate
  console.log('todaysDate: ', todaysDate)
  const todaysDayNumber = props.location.aboutProps.dayInfo.todaysDayNumber
  console.log('todayDayNumber: ', todaysDayNumber)
  // // Set up Current info
  const currYear = todaysYear
  console.log('currYear: ', currYear)
  // Use school year month number from now on
  const currMonthNumber = schoolYearMonthNumber
  console.log('currMonthNumber: ', currMonthNumber)
  const currMonthName = todaysMonthName
  console.log('currMonthName: ', currMonthName)
  const currMonthIndex = schoolYearMonthNumber - 1
  console.log('currMonthIndex: ', currMonthIndex)
  // Sort month object
  const currMonth = schoolYear[currMonthIndex].days.sort((a, b) => a.day - b.day)
  console.log('currMonth: ', currMonth)
  const currMonthId = schoolYear[currMonthIndex]._id
  console.log('currMonthId: ', currMonthId)
  const currDate = todaysDate
  console.log('currDate: ', currDate)
  const currDateIndex = todaysDate - 1
  console.log('currDateIndex: ', currDateIndex)
  const currDateId = schoolYear[currMonthIndex].days[currDateIndex]._id
  console.log('currDateId: ', currDateId)
  const currDayNumber = todaysDayNumber
  console.log('currDayNumber: ', currDayNumber)

  const dayNumbers = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  const currDayName = dayNumbers[currDayNumber]
  console.log('currDayName: ', currDayName)

  // Set up Previous Info
  let prevMonthNumber = currMonthNumber - 1
  if (currMonthNumber === 1) prevMonthNumber = 12

  let prevMonthIndex = currMonthIndex - 1
  if (currMonthIndex === 0) prevMonthIndex = 11

  console.log('prevMonthNumber: ', prevMonthNumber)
  console.log('prevMonthIndex: ', prevMonthIndex)
  const prevMonth = schoolYear[prevMonthIndex]
  console.log('prevMonth: ', prevMonth)
  const prevMonthName = prevMonth.month
  console.log('prevMonthName: ', prevMonthName)
  const prevMonthId = prevMonth._id
  console.log('prevMonthId: ', prevMonthId)

  let prevDate = 0
  let prevDateIndex = 0
  if ((currDate === 1 && currMonthName === 'September') || (currDate === 1 && currMonthName === 'November') || (currDate === 1 && currMonthName === 'February') || (currDate === 1 && currMonthName === 'April') || (currDate === 1 && currMonthName === 'June')) {
    prevDate = 31
    prevDateIndex = 30
  } else if ((currDate === 1 && currMonthName === 'August') || (currDate === 1 && currMonthName === 'October') || (currDate === 1 && currMonthName === 'December') || (currDate === 1 && currMonthName === 'January') || (currDate === 1 && currMonthName === 'May') || (currDate === 1 && currMonthName === 'July')) {
    prevDate = 30
    prevDateIndex = 29
  } else if (leapYear && currDate === 1 && currMonthName === 'March') {
    prevDate = 29
    prevDateIndex = 28
  } else if (!leapYear && currDate === 1 && currMonthName === 'March') {
    prevDate = 28
    prevDateIndex = 27
  } else {
    prevDate = currDate - 1
    prevDateIndex = currDateIndex - 1
  }

  console.log('prevDate: ', prevDate)
  console.log('prevDateIndex: ', prevDateIndex)

  let prevDateId = ''
  if (currDate === 1) {
    prevDateId = prevMonth.days[prevDateIndex]._id
  } else {
    prevDateId = currMonth.days[prevDateIndex]._id
  }
  console.log('prevDateId: ', prevDateId)

  let prevDayNumber = currDayNumber - 1
  if (currDayNumber === 0) prevDayNumber = 6
  console.log('prevDayNumber: ', prevDayNumber)
  const prevDay = dayNumbers[prevDayNumber]
  console.log('prevDay: ', prevDay)

  // Set up Next Info
  // let nextMonthIndex = currMonthIndex + 1
  // if (currMonthIndex === 11) nextMonthIndex = 0
  //
  // const nextMonth = sortedCurrSchoolYear[nextMonthIndex]
  // const nextMonthName = nextMonth.month
  // const nextMonthId = nextMonth._id
  //
  // let nextMonthNumber = currMonthNumber + 1
  // if (currMonthNumber === 12) nextMonthNumber = 1
  //
  // let nextDate = 0
  // if (currDate === currMonth.length) {
  //   nextDate = 1
  // } else {
  //   nextDate = currDate + 1
  // }
  //
  // const nextDateIndex = currDateIndex + 1
  // let nextDateId = ''
  // if (currDate === currMonth.days.length) {
  //   nextDateId = nextMonth.days[nextDateIndex]._id
  // } else {
  //   nextDateId = currMonth.days[nextDateIndex]._id
  // }
  //
  // let nextDayNumber = currDayNumber + 1
  // if (currDayNumber === 6) nextDayNumber = 0
  // const nextDay = dayNumbers[nextDayNumber]
  //
  // currMonthNumber = todaysMonthNumber + 5
  // console.log('currMonthNumber Test: ', currMonthNumber)
  //
  // // Determine if today's year and month are within the selected school year
  // if ((todaysYear === sortedCurrSchoolYear.startYear && todaysMonthName === 'August') || (todaysYear === sortedCurrSchoolYear.startYear && todaysMonthName === 'September') || (todaysYear === sortedCurrSchoolYear.startYear && todaysMonthName === 'October') || (todaysYear === sortedCurrSchoolYear.startYear && todaysMonthName === 'November') || (todaysYear === sortedCurrSchoolYear.startYear && todaysMonthName === 'December') || (todaysYear === sortedCurrSchoolYear.endYear && todaysMonthName === 'January') || (todaysYear === sortedCurrSchoolYear.endYear && todaysMonthName === 'February') || (todaysYear === sortedCurrSchoolYear.endYear && todaysMonthName === 'March') || (todaysYear === sortedCurrSchoolYear.endYear && todaysMonthName === 'April') || (todaysYear === sortedCurrSchoolYear.endYear && todaysMonthName === 'May') || (todaysYear === sortedCurrSchoolYear.endYear && todaysMonthName === 'June') || (todaysYear === sortedCurrSchoolYear.endYear && todaysMonthName === 'July')) {
  //   // If yes, date is today's date
  //   currYear = todaysYear
  //
  //   currMonthNumber = todaysMonthNumber + 5
  //   if (todaysMonthNumber === 8) currMonthNumber = 1
  //   currMonthName = monthNumbers[currMonthNumber]
  //
  //   currMonthIndex = currMonthNumber - 1
  //   if (currMonthNumber === 0) currMonthIndex = 11
  //   currDate = todaysDate
  //   currDayNumber = todaysDayNumber
  //   currDay = dayNumbers[currDayNumber]
  // } else {
  //   // Else, set new date to August 1, schoolyear startYear
  //   const newDay = new Date(`August 1, ${sortedCurrSchoolYear.startYear} 00:00:00`)
  //   const newYear = newDay.getFullYear()
  //   const newDate = newDay.getDate()
  //   const newMonthNumber = (newDay.getMonth() + 1)
  //   const newDayNumber = newDay.getDay()
  //   currYear = newYear
  //   currMonthNumber = newMonthNumber + 5
  //   if (newMonthNumber === 8) currMonthNumber = 1
  //   currMonthName = monthNumbers[newMonthNumber]
  //   currMonthIndex = currMonthNumber - 1
  //   if (currMonthNumber === 0) currMonthIndex = 11
  //   currDate = newDate
  //   currDayNumber = newDayNumber
  //   currDay = dayNumbers[currDayNumber]
  // }
  // console.log('currYear: ', currYear)
  // console.log('Current Month Number: ', currMonthNumber)
  // console.log('todaysMonthNumber: ', todaysMonthNumber)
  // console.log('currMonthName: ', currMonthName)
  //
  // const unsortedMonthObject = sortedCurrSchoolYear.find(month => month.month === currMonthName)
  // // console.log('unsortedMonthObject: ', )
  // const currMonth = unsortedMonthObject.days.sort((a, b) => a.day - b.day)
  //
  // console.log('Current Date: ', currDate)

  return (
    // <Redirect to={{
    //   pathname: '/current-day',
    //   aboutProps: {
    //     schoolYearInfo: { sortedCurrSchoolYear, currSchoolYearId },
    //     yearInfo: { currYear },
    //     monthInfo: { currMonthIndex, currMonthId, currMonth, currMonthName, currMonthNumber, prevMonthIndex, prevMonthId, prevMonth, prevMonthName, prevMonthNumber, nextMonthIndex, nextMonthId, nextMonth, nextMonthName, nextMonthNumber },
    //     dateInfo: { currDateIndex, currDate, currDateId, prevDateIndex, prevDate, prevDateId, nextDateIndex, nextDate, nextDateId },
    //     dayInfo: { currDay, currDayNumber, prevDay, prevDayNumber, nextDay, nextDayNumber }
    //   }
    // }} />
    <div>CurrentSchoolYear Component</div>
  )
}

export default CurrentSchoolYear
