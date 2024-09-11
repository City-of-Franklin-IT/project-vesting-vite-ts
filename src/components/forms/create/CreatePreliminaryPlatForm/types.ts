// Types
import { NavigateFunction } from "react-router-dom"
import { UseFormSetValue } from "react-hook-form"

export interface CreatePreliminaryPlatFormState { // CreatePreliminaryPlatForm useForm state
  type: 'Preliminary Plat',
  name: string,
  cof: number,
  ordinance: Date,
  approval: {
    FPMC: {
      date: Date | string | undefined
    }
  },
  vesting: {
    tenYear: {
      date: Date | string | undefined
    },
    fifteenYear: {
      date: Date | string | undefined
    }
  },
  milestones: {
    first: {
      date: Date | string | undefined
    },
    second: {
      date: Date | string | undefined
    }
  },
  notes: string
}

export interface OnSubmitProps { // onSubmit fn props
  formData: CreatePreliminaryPlatFormState
  options: {
    navigate: NavigateFunction
  }
}

export interface UseSetDatesObjProps { // useSetDatesObj hook props
  values: {
    approval: {
      FPMC: {
        date: Date | string | undefined
      }
    },
    vesting: {
      tenYear: {
        date: Date | string | undefined
      },
      fifteenYear: {
        date: Date | string | undefined
      }
    },
    milestones: {
      first: {
        date: Date | string | undefined
      },
      second: {
        date: Date | string | undefined
      }
    },
  }
}

export interface DatesObj {
  fpmcDate: Date | string | undefined,
  tenYearDate: Date | string | undefined,
  fifteenYearDate: Date | string | undefined,
  firstMilestoneDate: Date | string | undefined,
  secondMilestoneDate: Date | string | undefined
}

export interface UseSetDatesProps { // useSetDates hook props
  dates: DatesObj
  options: {
    setValue: UseFormSetValue<CreatePreliminaryPlatFormState>
  }
}

export type SetValueKeys =
  | 'milestones.first.date'
  | 'milestones.second.date'
  | 'vesting.tenYear.date'
  | 'vesting.fifteenYear.date'