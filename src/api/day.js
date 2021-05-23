import apiUrl from '../apiConfig'
import axios from 'axios'

export const day = (schoolYear, schoolYearId, monthId, num, user, msgAlert) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months/${monthId}/days`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      day: {
        day: `${num}`
      }
    }
  })
    // .then(console.log('Calendar Created'))
    .catch(error => console.log(error))
}
