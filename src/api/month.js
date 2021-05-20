import apiUrl from '../apiConfig'
import axios from 'axios'

export const august = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'August'
      }
    }
  })
}

export const september = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'September'
      }
    }
  })
}
