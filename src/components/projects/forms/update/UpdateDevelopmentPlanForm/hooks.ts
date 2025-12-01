import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router"
import { useQueryClient } from "react-query"
import { useForm, useFieldArray } from "react-hook-form"
import { addYears } from "@/helpers/utils"
import { useEnableQuery, useProjectCreateCtx, useMilestoneExt } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateDevelopmentPlan } from './utils'

// Types
import { Path } from "react-hook-form"
import * as AppTypes from '@/context/types'

export const useHandleUpdateDevelopmentPlanForm = (project: AppTypes.ProjectInterface) => {
  const methods = useUpdateDevelopmentPlanForm(project)
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, handleFormSubmit }
}

export const useHandleBOMADateChange = () => { // Set other dates on BOMA date change
  const { methods } = useProjectCreateCtx()

  const { setValue, watch, getValues } = methods

  const bomaDate = watch(`Approvals.${ 1 }.date`)

  const cb = useCallback(() => {
    if(bomaDate) {
      const setFormValue = (field: Path<AppTypes.ProjectCreateInterface>, years: number) => {
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

export const useHandleAddVestingExtensionBtn = (type: "10Y" | "15Y") => { // Hide / show vesting extension button
  const { methods: { getValues, setValue } } = useProjectCreateCtx()

  const vestingPeriods = getValues('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === type)

  const setVisibility = () => {
    if(index === -1 || !vestingPeriods[index]?.uuid) return false // Check if vesting period exists and has uuid

    const vestingStatus = vestingPeriods[index].VestingStatus

    if(vestingStatus?.achieved || vestingStatus?.expired) return false

    if(getValues('expired')) return false

    return true
  }

  const onClick = () => {
    const period = vestingPeriods[index]

    setValue(`VestingPeriods.${ index }.VestingExtension.date`, "", { shouldValidate: true, shouldDirty: true })
    setValue(`VestingPeriods.${ index }.VestingExtension.parentId`, period.uuid as string, { shouldValidate: true, shouldDirty: true })
  }

  const visible = setVisibility()

  return { onClick, visible }
}

export const useHandleNotificationInputs = () => {
  const { methods: { watch } } = useProjectCreateCtx()

  const notifications = watch('VestingNotifications')

  const className = `flex mb-8 justify-evenly flex-wrap ${ notifications?.length ? 'hidden' : '' }`

  return className
}

export const useHandleAddVestingBtn = (type: '10Y' | '15Y') => {
  const { methods: { getValues, control, watch } } = useProjectCreateCtx()

  const vestingPeriods = watch(`VestingPeriods`)

  const vestingPeriod = vestingPeriods.findIndex(period => period.type === type)

  const { append } = useFieldArray({
    control,
    name: 'VestingPeriods'
  })

  const onClick = () => {
    append({
      type,
      date: "",
      parentId: getValues('uuid') as string,
    })
  }

  const visible = vestingPeriod !== -1 ? false : true

  const label = type === '10Y' ? 'Add 10 Year Vesting Period' : 'Add 15 Year Vesting Period'

  return { onClick, visible, label }
}

export const useHandleTenYearVestingDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const vestingPeriods = methods.watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "10Y") // Check if 10Y is in form state

  const fifteenYearVestingPeriod = vestingPeriods.find(period => period.type === "15Y")

  const visible = index !== -1

  const controllerProps = {
    methods,
    index
  }

  return { controllerProps, disabled, fifteenYearVestingPeriod, visible }
}

export const useHandleTenYearVestingExtensionInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const vestingPeriods = methods.watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "10Y")

  const visible = index !== -1

  const showBtn = index !== -1 ? !vestingPeriods[index]?.VestingExtension : false

  const vestingPeriodDate = vestingPeriods[index]?.date

  const controllerProps = {
    methods,
    vestingPeriodDate,
    index
  }

  return { controllerProps, disabled, visible, showBtn }
}

export const useHandleVestingAchievedCheckbox = (type: '10Y' | '15Y') => {
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === type)

  const visible = index === -1 || !vestingPeriods[index].uuid ? false : true

  const expired = watch(`VestingPeriods.${ index }.VestingStatus.expired`)

  const controllerProps = {
    control,
    expired,
    index
  }

  return { visible, controllerProps, disabled }
}

export const useHandleVestingExpiredCheckbox = (type: '10Y' | '15Y') => {
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === type)

  const visible = index === -1 || !vestingPeriods[index].uuid ? false : true

  const achieved = watch(`VestingPeriods.${ index }.VestingStatus.achieved`)

  const controllerProps = {
    control,
    achieved,
    index
  }

  return { visible, controllerProps, disabled }
}

export const useHandleFifteenYearVestingDateInput = () => {
  const { methods: { control, watch }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const tenYearVesting = vestingPeriods.find(period => period.type === "10Y")

  const index = vestingPeriods.findIndex(period => period.type === "15Y") // Check if 15Y is in form state

  const visible = index === -1 ? false : true

  const controllerProps = {
    control,
    index,
    tenYearVesting
  }

  return { visible, controllerProps, disabled }
}

export const useHandleFifteenYearVestingExtensionInput = () => {
  const { methods: { control, watch }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "15Y")

  const vestingPeriod = vestingPeriods[index]

  const visible = index !== -1

  const showBtn = index !== -1 ? !vestingPeriods[index]?.VestingExtension : false

  const controllerProps = {
    control,
    index,
    vestingPeriod
  }

  return { visible, controllerProps, showBtn, disabled }
}

export const useHandleAddMilestoneExtensionBtn = (index: number) => {
  const { methods: { setValue, watch } } = useProjectCreateCtx()

  const milestones = watch('Milestones')

  const onClick = () => {
    const milestone = milestones[index]

    setValue(`Milestones.${ index }.MilestoneExtension.date`, "", { shouldValidate: true, shouldDirty: true })
    setValue(`Milestones.${ index }.MilestoneExtension.parentId`, milestone.uuid as string, { shouldValidate: true, shouldDirty: true })
  }

  const milestoneStatus = milestones[index].MilestoneStatus

  const visible = milestoneStatus.achieved || milestoneStatus.expired ? false : true

  return { visible, onClick }
}

export const useHandleMilestoneExtensionInput = (index: number) => {
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()
  
  useMilestoneExt()

  const milestone = watch(`Milestones.${ index }`)

  const milestoneStatus = milestone.MilestoneStatus

  const showBtn = !milestone.MilestoneExtension && !milestoneStatus.achieved && !milestoneStatus.expired

  const controllerProps = {
    milestone,
    control
  }

  return { showBtn, controllerProps, disabled }
}

export const useHandleMilestoneAchievedCheckbox = (index: number) => {
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const expired = watch(`Milestones.${ index }.MilestoneStatus.expired`)

  const controllerProps = {
    control,
    expired
  }

  return { controllerProps, disabled }
}

export const useHandleMilestoneExpiredCheckbox = (index: number) => {
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const achieved = watch(`Milestones.${ index }.MilestoneStatus.achieved`)

  const controllerProps = {
    control,
    achieved
  }

  return { controllerProps, disabled }
}

export const useHandleAddNotificationBtn = (type: AppTypes.NotificationTypes) => {
  const { methods: { watch, control, getValues } } = useProjectCreateCtx()

  const notifications = watch('VestingNotifications')

  const { append } = useFieldArray({
    control,
    name: 'VestingNotifications'
  })

  const index = notifications?.findIndex(notification => notification.type === type)

  const visible = index !== -1 ? false : true

  const onClick = () => {
    append({
      type,
      date: "",
      parentId: getValues('uuid') as string
    })
  }

  return { onClick, visible }
}

export const useHandleNotificationInput = (type: AppTypes.NotificationTypes) => {
  const { methods: { control, watch }, disabled } = useProjectCreateCtx()

  const notifications = watch('VestingNotifications') || []

  const index = notifications.findIndex(notification => notification.type === type)

  const visible = index !== -1

  const controllerProps = {
    control,
    index
  }

  return { controllerProps, visible, disabled }
}

const useUpdateDevelopmentPlanForm = (project: AppTypes.ProjectInterface) => { // Update development plan form state

  return useForm<AppTypes.ProjectCreateInterface>({
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

const useHandleFormSubmit = () => {
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  return useCallback((formData: AppTypes.ProjectCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleUpdateDevelopmentPlan(formData, token)
      .then(_ => {
        queryClient.invalidateQueries(['getProject', formData.uuid])
        queryClient.invalidateQueries('getProjects')
        navigate('/projects')
      })
      .catch(err => errorPopup(err))
  }, [navigate, enabled, token])
}