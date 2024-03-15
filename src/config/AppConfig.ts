import { UserEntity } from "@/model/user/UserEntity";
import { ref } from "vue";

export class AppConfig{
  static currentUser  = ref(new UserEntity())
}