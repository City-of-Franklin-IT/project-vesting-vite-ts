// Types
import { UseFormReset, UseFormSetValue } from "react-hook-form"
import { NavigateFunction } from "react-router-dom"
import { Project } from "../../../../context/App/types"

export interface UpdateSitePlanFormProps { // UpdateSitePlan props
  data: Project
}

export interface UpdateSitePlanFormState { // UpdateSitePlan useForm state object
  expired: boolean,
  name: string,
  cof: number,
  ordinance: Date | string | undefined,
  approval: {
    approvedBy: string,
    date: Date | string | undefined,
    uuid: string
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

export interface UseUpdateSitePlanFormProps { // useUpdateSitePlanForm hook props
  data: Project
}

export interface OnSubmitProps { // onSubmit fn props
  formData: UpdateSitePlanFormState
  options: {
    reset: UseFormReset<UpdateSitePlanFormState>
    navigate: NavigateFunction
  }
}

export interface UseSetDatesObjProps { // useSetdatesObj hook props
  values: {
    approval: {
      approvedBy: string,
      date: Date | string | undefined,
      uuid: string
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
        date: Date | string | undefined,
        uuid: string,
        extension: {
          date: Date | string | undefined,
          uuid: string
        }
      },
      second: {
        date: Date | string | undefined,
        uuid: string,
        extension: {
          date: Date | string | undefined,
          uuid: string
        }
      }
    },
    notifications: {
      initial: {
        date: Date | string | undefined,
        uuid: string
      },
      lastCall: {
        date: Date | string | undefined,
        uuid: string
      },
      lostVesting: {
        date: Date | string | undefined,
        uuid: string
      }
    }
  }
}

export interface DatesObj {
  approval: {
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
  values: UpdateSitePlanFormState
  options: {
    setValue: UseFormSetValue<UpdateSitePlanFormState>
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
    setValue: UseFormSetValue<UpdateSitePlanFormState>
  }
}

export interface HandleDeleteValueProps { // handleDeleteValue fn props
  target: SetValueKeys
  uuid: string
  options: {
    setValue: UseFormSetValue<UpdateSitePlanFormState>
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