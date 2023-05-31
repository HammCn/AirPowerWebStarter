import { Expose } from 'class-transformer'
import { ITree } from '@/airpower/interface/ITree'
import { BaseEntity } from './BaseEntity'
import { FieldName } from '@/airpower/decorator/CustomName'
import { TableField } from '@/airpower/decorator/TableField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { FormField } from '@/airpower/decorator/FormField'

/**
 * # 抽象树基类
 * @author Hamm
 */
export abstract class BaseAbstractTreeEntity<E extends BaseAbstractTreeEntity<E>> extends BaseEntity implements ITree<E> {
    @FieldName('名称')
    @TableField()
    @SearchField()
    @FormField()
    @Expose() name!: string

    @Expose() parentId!: number

    abstract children: E[]
}
