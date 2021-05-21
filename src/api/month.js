import apiUrl from '../apiConfig'
import axios from 'axios'

export const month = (schoolYear, schoolYearId, monthName, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: `${monthName}`
      }
    }
  })
}

export const august = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'August',
        number: 1
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
        month: 'September',
        number: 2
      }
    }
  })
}

export const october = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'October',
        number: 3
      }
    }
  })
}

export const november = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'November',
        number: 4
      }
    }
  })
}

export const december = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'December',
        number: 5
      }
    }
  })
}

export const january = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'January',
        number: 6
      }
    }
  })
}

export const february = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'February',
        number: 7
      }
    }
  })
}

export const march = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'March',
        number: 8
      }
    }
  })
}

export const april = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'April',
        number: 9
      }
    }
  })
}

export const may = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'May',
        number: 10
      }
    }
  })
}

export const june = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'June',
        number: 11
      }
    }
  })
}

export const july = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'July',
        number: 12
      }
    }
  })
}
