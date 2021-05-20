import apiUrl from '../apiConfig'
import axios from 'axios'

export const august = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/monthsOfYear`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      monthOfYear: {
        month: 'August'
      }
    }
  })
}

export const september = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/monthsOfYear`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      monthOfYear: {
        month: 'September'
      }
    }
  })
}
