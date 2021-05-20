import apiUrl from '../apiConfig'
import axios from 'axios'

export const august = (schoolYear, schoolYearId, user, num) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/daysOfYear`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      dayOfYear: {
        day: `August ${num}, ${schoolYear.startYear} 00:00:0000`
      }
    }
  })
}
