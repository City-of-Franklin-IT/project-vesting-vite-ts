// Types
import { UseFormSetValue } from "react-hook-form"
import { NavigateFunction } from "react-router-dom"

export interface CreateDevelopmentPlanFormState { // CreateDevelopmentPlanForm useForm state
  type: 'Development Plan',
  name: string,
  cof: number,
  resolution: string,
  ordinance: Date,
  approval: {
    FPMC: {
      date: Date | string | undefined
    },
    BOMA: {
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
  formData: CreateDevelopmentPlanFormState
  options: {
    navigate: NavigateFunction
  }
}

export interface UseSetDatesObjProps { // useSetDatesObj hook props
  values: {
    approval: {
      FPMC: {
        date: Date | string | undefined
      },
      BOMA: {
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
    }
  }
}

export interface DatesObj {
  fpmcDate: Date | string | undefined,
  bomaDate: Date | string | undefined,
  tenYearDate: Date | string | undefined,
  fifteenYearDate: Date | string | undefined,
  firstMilestoneDate: Date | string | undefined,
  secondMilestoneDate: Date | string | undefined
}

export interface UseSetDatesProps { // useSetDates hook props
  dates: DatesObj
  options: {
    setValue: UseFormSetValue<CreateDevelopmentPlanFormState>
  }
}

export type SetValueKeys =
  | 'milestones.first.date'
  | 'milestones.second.date'
  | 'vesting.tenYear.date'
  | 'vesting.fifteenYear.date'