import type {DynamicPageAttributes} from "../plugins/dynamic-pages";
import type {FrontMatterResult} from "front-matter";

type VarType = Array<DynamicPageAttributes> | null;

export const useDynamicPages = (): Ref<VarType> => useState<VarType>('dynamicPages', () => null);