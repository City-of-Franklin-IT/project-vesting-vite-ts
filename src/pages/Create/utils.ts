// Types
import { FormTypes } from "./types"

// Components
import CreateDevelopmentPlanForm from "@/components/projects/forms/create/CreateDevelopmentPlanForm"
import PreliminaryPlatForm from '@/components/projects/forms/create/CreatePreliminaryPlatForm'
import SitePlanForm from '@/components/projects/forms/create/CreateSitePlanForm'

export const FormTypeMap = new Map<FormTypes, () => JSX.Element>([
  ['Development Plan', CreateDevelopmentPlanForm],
  ['Preliminary Plat', PreliminaryPlatForm],
  ['Site Plan', SitePlanForm]
])