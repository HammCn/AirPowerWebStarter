import Mock from 'mockjs'
import login from './api/login'

const mocks = [...login]

Mock.setup({
  timeout: '300',
})

export default function GenerateMock() {
  for (const i of mocks) {
    Mock.mock(i.url, i.type || 'get', i.response)
  }
}
