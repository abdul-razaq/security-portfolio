import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { certificationType } from "./certificationType";
import { educationType } from "./educationType";
import { experienceType } from "./experienceType";
import { homePageType } from "./homePageType";
import { infographicType } from "./infographicType";
import { postType } from "./postType";
import { skillType } from "./skillType";

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
    infographicType,
  ],
};
