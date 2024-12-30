// Types
import { UseFormReset, UseFormSetValue } from "react-hook-form"
import { NavigateFunction } from "react-router-dom"
import { Project } from "../../../../context/App/types"

export interface UpdatePreliminaryPlatFormProps { // UpdatePreliminaryPlatForm props
  project: Project
}

export interface UpdatePreliminaryPlatFormUseForm { // UpdatePreliminaryPlatForm useForm state object
  expired: boolean,
  name: string,
  cof: number,
  ordinance: Date | string | undefined,
  approval: {
    FPMC: {
      date: Date | string | undefined
      uuid: string
    }
  },
  vesting: {
    tenYear: {
      date: Date | string | undefined
      uuid: string
      status: {
        achieved: boolean
        expired: boolean
        uuid: string
      }
      extension: {
        date: Date | string | undefined
        uuid: string
      }
    }
    fifteenYear: {
      date: Date | string | undefined
      uuid: string
      status: {
        achieved: boolean
        expired: boolean
        uuid: string
      }
      extension: {
        date: Date | string | undefined
        uuid: string
      }
    }
  }
  milestones: {
    first: {
      date: Date | string | undefined
      uuid: string
      status: {
        achieved: boolean
        expired: boolean
        uuid: string
      }
      extension: {
        date: Date | string | undefined
        uuid: string
      }
    }
    second: {
      date: Date | string | undefined
      uuid: string
      status: {
        achieved: boolean
        expired: boolean
        uuid: string
      }
      extension: {
        date: Date
        uuid: string
      }
    }
  }
  notifications: {
    initial: {
      date: Date | string | undefined
      type: string
      uuid: string
    }
    lastCall: {
      date: Date | string | undefined
      type: string
      uuid: string
    }
    lostVesting: {
      date: Date | string | undefined
      type: string
      uuid: string
    }
  }
  notes: string
  uuid: string
}

export interface OnSubmitProps { // onSubmit fn props
  formData: UpdatePreliminaryPlatFormUseForm
  options: {
    reset: UseFormReset<UpdatePreliminaryPlatFormUseForm>
    navigate: NavigateFunction
  }
}

export interface UseUpdatePreliminaryPlatFormProps { // useUpdatePreliminaryPlatForm hook props
  data: Project
}

export interface UseExpireProjectProps { // useExpireProject hook props
  values: UpdatePreliminaryPlatFormUseForm
  options: {
    setValue: UseFormSetValue<UpdatePreliminaryPlatFormUseForm>
  }
}

export interface UseMilestoneExt { // useMilestoneExt hook props
  milestones: {
    first: {
      date: Date | string | undefined
      uuid: string
      status: {
        achieved: boolean
        expired: boolean
        uuid: string
      }
      extension: {
        date: Date | string | undefined
        uuid: string
      }
    }
    second: {
      date: Date | string | undefined
      uuid: string
      status: {
        achieved: boolean
        expired: boolean
        uuid: string
      }
      extension: {
        date: Date | string | undefined
        uuid: string
      }
    }
  }
  options: {
    setValue: UseFormSetValue<UpdatePreliminaryPlatFormUseForm>
  }
}

export interface HandleDeleteValueProps { // handleDeleteValue fn props
  target: SetValueKeys
  uuid: string
  options: {
    setValue: UseFormSetValue<UpdatePreliminaryPlatFormUseForm>
  }
}

export type SetValueKeys =
  | "vesting.tenYear.date"
  | "vesting.fifteenYear.date"
  | "vesting.tenYear.extension.date"
  | "vesting.fifteenYear.extension.date"
  | "milestones.first.date"
  | "milestones.second.date"
  | "milestones.first.extension.date"
  | "milestones.second.extension.date"
  | "notifications.initial.date"
  | "notifications.lastCall.date"
  | "notifications.lostVesting.date"