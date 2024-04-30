import { AirConfig } from '../../airpower/config/AirConfig'

export default [
  {
    url: `${AirConfig.apiUrl}user/login`,
    type: 'post',
    response: {
      code: 200,
      data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwibmFtZWlkIjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2F1dGhlbnRpY2F0aW9uIjoiU2VsZiIsIm5iZiI6MTcxMzc0Njg0OCwiZXhwIjoxNzEzNzUwNDQ4LCJpYXQiOjE3MTM3NDY4NDh9.q3WFxyGofbism6IyQWEQ99u7P9sq1PqwsBt8oDLa4Nk',
    },
  },
]
