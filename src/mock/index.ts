import Mock from 'mockjs'
import login from './api/login'

const mocks = [...login]

Mock.setup({
  timeout: '300',
})

export function mockXHR() {
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}
