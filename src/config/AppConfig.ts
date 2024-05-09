import { ref } from 'vue'
import { UserEntity } from '@/model/user/UserEntity'

export class AppConfig {
  static currentUser = ref(new UserEntity())
}
