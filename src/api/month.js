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

export const october = (schoolYear, schoolYearId, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + `/schoolYears/${schoolYearId}/months`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      month: {
        month: 'October'
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
        month: 'November'
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
        month: 'December'
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
        month: 'January'
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
        month: 'February'
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
        month: 'March'
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
        month: 'April'
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
        month: 'May'
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
        month: 'June'
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
        month: 'July'
      }
    }
  })
}
