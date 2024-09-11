// Types
import { UseFormReset, UseFormSetValue } from "react-hook-form"
import { NavigateFunction } from "react-router-dom"
import { Project } from "../../../../context/App/types"

export interface UpdateDevelopmentPlanFormProps { // UpdateDevelopmentPlanForm props
  data: Project
}

export interface UpdateDevelopmentPlanFormState { // UpdateDevelopmentPlanForm useForm state object
  expired: boolean
  name: string
  cof: number
  resolution: {
    resolution: string
    uuid: string
  }
  ordinance: Date | string | undefined
  approval: {
    FPMC: {
      date: Date | string | undefined
      uuid: string
    }
    BOMA: {
      date: Date | string | undefined
      uuid: string
    }
  }
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
  formData: UpdateDevelopmentPlanFormState
  options: {
    reset: UseFormReset<UpdateDevelopmentPlanFormState>
    navigate: NavigateFunction
  }
}

export interface UseSetDatesObjProps { // useSetDatesObj hook props
  values: {
    approval: {
      FPMC: {
        date: Date | string | undefined
        uuid: string
      },
      BOMA: {
        date: Date | string | undefined
        uuid: string
      }
    },
    vesting: {
      tenYear: {
        date: Date | string | undefined
        uuid: string
        extension: {
          date: Date | string | undefined
          uuid: string
        }
      },
      fifteenYear: {
        date: Date | string | undefined
        uuid: string
        extension: {
          date: Date | string | undefined
          uuid: string
        }
      }
    },
    milestones: {
      first: {
        date: Date | string | undefined
        uuid: string
        extension: {
          date: Date | string | undefined
          uuid: string
        }
      },
      second: {
        date: Date | string | undefined
        uuid: string
        extension: {
          date: Date | string | undefined
          uuid: string
        }
      }
    }
    notifications: {
      initial: {
        date: Date | string | undefined
        uuid: string
      },
      lastCall: {
        date: Date | string | undefined
        uuid: string
      },
      lostVesting: {
        date: Date | string | undefined
        uuid: string
      }
    }
  }
}

export interface DatesObj {
  FPMC: {
    date: Date | string | undefined,
    uuid: string
  },
  BOMA: {
    date: Date | string | undefined,
    uuid: string
  },
  tenYear: {
    date: Date | string | undefined,
    uuid: string
    extension: {
      date: Date | string | undefined,
      uuid: string
    }
  },
  fifteenYear: {
    date: Date | string | undefined,
    uuid: string
    extension: {
      date: Date | string | undefined,
      uuid: string
    }
  },
  firstMilestone: {
    date: Date | string | undefined,
    uuid: string,
    extension: {
      date: Date | string | undefined,
      uuid: string
    }
  },
  secondMilestone: {
    date: Date | string | undefined,
    uuid: string,
    extension: {
      date: Date | string | undefined,
      uuid: string
    }
  },
  initialNotification: {
    date: Date | string | undefined,
    uuid: string
  },
  lastCallNotification: {
    date: Date | string | undefined,
    uuid: string
  },
  lostVestingNotification: {
    date: Date | string | undefined,
    uuid: string
  }
}

export interface UseExpireProjectProps { // useExpireProject hook props
  values: UpdateDevelopmentPlanFormState
  options: {
    setValue: UseFormSetValue<UpdateDevelopmentPlanFormState>
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
    setValue: UseFormSetValue<UpdateDevelopmentPlanFormState>
  }
}

export interface HandleDeleteValueProps { // handleDeleteValue fn props
  target: SetValueKeys
  uuid: string
  options: {
    setValue: UseFormSetValue<UpdateDevelopmentPlanFormState>
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