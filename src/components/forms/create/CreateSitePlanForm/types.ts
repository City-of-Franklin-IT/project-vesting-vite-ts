// Types
import { NavigateFunction } from "react-router-dom"
import { UseFormSetValue } from "react-hook-form"

export interface CreateSitePlanFormState { // CreateSitePlanForm useForm state
  type: 'Site Plan',
  name: string,
  cof: number,
  ordinance: Date,
  approval: {
    approvedBy: ApprovedBy | undefined,
    date: Date | string | undefined
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
  notes: ''
}

export interface OnSubmitProps { // onSubmit fn props
  formData: CreateSitePlanFormState,
  navigate: NavigateFunction,
  token: string
}

export interface UseSetDatesObjProps { // useSetDatesObj hook props
  values: {
    approval: {
      date: Date | string | undefined
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
  approvalDate: Date | string | undefined,
  tenYearDate: Date | string | undefined,
  fifteenYearDate: Date | string | undefined,
  firstMilestoneDate: Date | string | undefined,
  secondMilestoneDate: Date | string | undefined
}

export interface UseSetDatesProps { // useSetDates hook props
  dates: DatesObj,
  setValue: UseFormSetValue<CreateSitePlanFormState>
}

export type SetValueKeys =
  | 'milestones.first.date'
  | 'milestones.second.date'
  | 'vesting.tenYear.date'
  | 'vesting.fifteenYear.date'

export type ApprovedBy =
  | 'Admin'
  | 'FPMC'
