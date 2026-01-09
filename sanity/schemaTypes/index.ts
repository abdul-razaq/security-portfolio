import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {homePageType} from './homePageType'
import {skillType} from './skillType'
import {experienceType} from './experienceType'
import {educationType} from './educationType'
import {certificationType} from './certificationType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType, 
    categoryType, 
    postType, 
    authorType, 
    homePageType,
    skillType,
    experienceType,
    educationType,
    certificationType,
  ],
}
