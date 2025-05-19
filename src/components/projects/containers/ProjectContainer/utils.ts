// Types
import { FormTypes } from "@/pages/Create/types"
import { ProjectInterface } from "@/context/types"

// Components
import UpdateDevelopmentPlanForm from "../../forms/update/UpdateDevelopmentPlanForm"
import UpdateSitePlanForm from "../../forms/update/UpdateSitePlanForm"
import UpdatePreliminaryPlatForm from "../../forms/update/UpdatePreliminaryPlatForm"

export const FormTypeMap = new Map<FormTypes, ({ project }: { project: ProjectInterface }) => JSX.Element>([
  ['Development Plan', UpdateDevelopmentPlanForm],
  ['Preliminary Plat', UpdatePreliminaryPlatForm],
  ['Site Plan', UpdateSitePlanForm]
])