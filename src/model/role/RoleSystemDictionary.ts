import { AirColor } from '@/airpower/enum/AirColor'
import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'

export const RoleSystemDictionary = AirDictionaryArray.create([
  { key: false, label: '外部角色', color: AirColor.NORMAL },
  { key: true, label: '内置角色', color: AirColor.DANGER },
])
