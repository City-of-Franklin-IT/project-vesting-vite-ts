import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { addYears } from "@/helpers/utils"
import { useEnableQuery, useProjectCreateCtx } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateDevelopmentPlan } from './utils'

// Types
import { Path } from "react-hook-form"
import { ProjectInterface, ProjectCreateInterface } from "@/context/types"

export const useUpdateDevelopmentPlanForm = (project: ProjectInterface) => { // Update development plan form state

  return useForm<ProjectCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      type: project.type,
      expired: project.expired,
      name: project.name,
      cof: project.cof,
      Resolution: project.Resolution,
      ordinance: project.ordinance,
      Approvals: project.Approvals?.map(approval => { return { ...approval, date: approval.date.toString() } }),
      VestingPeriods: project.VestingPeriods?.map(period => { return { ...period, date: period.date.toString() } }),
      Milestones: project.Milestones?.map(milestone => { return { ...milestone, date: milestone.date.toString() } }),
      VestingNotifications: project.VestingNotifications,
      notes: project.notes,
      uuid: project.uuid
    }
  })
}

export const useHandleBOMADateChange = () => { // Set other dates on BOMA date change
  const { methods } = useProjectCreateCtx()

  const { setValue, watch, getValues } = methods

  const bomaDate = watch(`Approvals.${ 1 }.date`)

  const cb = useCallback(() => {
    if(bomaDate) {
      const setFormValue = (field: Path<ProjectCreateInterface>, years: number) => {
        setValue(field, addYears(years, bomaDate), { shouldValidate: true, shouldDirty: true })
      }

      setFormValue(`Milestones.${ 0 }.date`, 3)
      setFormValue(`Milestones.${ 1 }.date`, 5)

      const vestingPeriods = getValues(`VestingPeriods`) || []

      vestingPeriods.forEach((period, index) => {
        const yearsToAdd = period.type === "10Y" ? 10 : 15
        setFormValue(`VestingPeriods.${ index }.date`, yearsToAdd)
      })
    }

  }, [bomaDate, setValue, getValues])

  useEffect(() => {
    cb()
  }, [cb])
}

export const useHandleVestingExtensionBtn = (type: "10Y" | "15Y") => { // Hide / show vesting extension button
  const { methods: { getValues, setValue } } = useProjectCreateCtx()

  const vestingPeriods = getValues('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === type)

  if(index === -1 || !vestingPeriods[index]?.uuid) return false // Check if vesting period exists and has uuid

  const vestingStatus = vestingPeriods[index].VestingStatus

  if(vestingStatus?.achieved !== null || vestingStatus.expired !== null) return false

  if(getValues('expired')) return false

  return useCallback(() => {
    const period = vestingPeriods[index]

    setValue(`VestingPeriods.${ index }.VestingExtension.date`, "", { shouldValidate: true, shouldDirty: true })
    setValue(`VestingPeriods.${ index }.VestingExtension.parentId`, period.uuid as string, { shouldValidate: true, shouldDirty: true })
  }, [])
}

export const useShowNotificationInputs = () => {
  const { methods: { watch } } = useProjectCreateCtx()

  const notifications = watch('VestingNotifications')

  return notifications?.length ? true : false
}

export const useHandleFormSubmit = () => {
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()

  return useCallback((formData: ProjectCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleUpdateDevelopmentPlan(formData, token)
      .then(_ => navigate('/projects'))
      .catch(err => errorPopup(err))
  }, [navigate, enabled, token])
}