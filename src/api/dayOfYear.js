import apiUrl from '../apiConfig'
import axios from 'axios'

export const august = (schoolYear, schoolYearId, user, i) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/daysOfYear`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      dayOfYear: {
        day: `August ${i}, ${schoolYear.startYear} 00:00:0000`
      }
    }
  })
}

export const september = (schoolYear, schoolYearId, user, i) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/daysOfYear`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      dayOfYear: {
        day: `September ${i}, ${schoolYear.startYear} 00:00:0000`
      }
    }
  })
}
