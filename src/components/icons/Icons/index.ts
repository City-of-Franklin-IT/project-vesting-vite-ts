// Types
import { SetIconSrcProps, Options, IconVariants } from './types'

// Icons
import ordinanceIconDark from '../../../assets/icons/ordinance/ordinance-dark.svg'
import ordinanceIconLight from '../../../assets/icons/ordinance/ordinance-light.svg'
import ordinanceIconRed from '../../../assets/icons/ordinance/ordinance-red.svg'
import typeIconDark from '../../../assets/icons/type/type-dark.svg'
import typeIconLight from '../../../assets/icons/type/type-light.svg'
import typeIconRed from '../../../assets/icons/type/type-red.svg'
import resolutionIconDark from '../../../assets/icons/resolution/resolution-dark.svg'
import resolutionIconLight from '../../../assets/icons/resolution/resolution-light.svg'
import resolutionIconRed from '../../../assets/icons/resolution/resolution-red.svg'
import firstMilestoneDark from '../../../assets/icons/first-milestone/first-milestone-dark.svg'
import firstMilestoneLight from '../../../assets/icons/first-milestone/first-milestone-light.svg'
import firstMilestoneRed from '../../../assets/icons/first-milestone/first-milestone-red.svg'
import firstMilestoneGreen from '../../../assets/icons/first-milestone/first-milestone-green.svg'
import secondMilestoneDark from '../../../assets/icons/second-milestone/second-milestone-dark.svg'
import secondMilestoneLight from '../../../assets/icons/second-milestone/second-milestone-light.svg'
import secondMilestoneRed from '../../../assets/icons/second-milestone/second-milestone-red.svg'
import secondMilestoneGreen from '../../../assets/icons/second-milestone/second-milestone-green.svg'
import tenYearVestingDark from '../../../assets/icons/ten-years/ten-years-dark.svg'
import tenYearVestingLight from '../../../assets/icons/ten-years/ten-years-light.svg'
import tenYearVestingRed from '../../../assets/icons/ten-years/ten-years-red.svg'
import fifteenYearVestingDark from '../../../assets/icons/fifteen-years/fifteen-years-dark.svg'
import fifteenYearVestingLight from '../../../assets/icons/fifteen-years/fifteen-years-light.svg'
import fifteenYearVestingRed from '../../../assets/icons/fifteen-years/fifteen-years-red.svg'
import expandIconDark from '../../../assets/icons/expand/expand-dark.svg'
import expandIconLight from '../../../assets/icons/expand/expand-light.svg'
import minimizeIconDark from '../../../assets/icons/minimize/minimize-dark.svg'
import minimizeIconLight from '../../../assets/icons/minimize/minimize-light.svg'
import sadFaceIcon from '../../../assets/icons/sad-face/sad-face.svg'

export const setIconSrc = (type: SetIconSrcProps['type'], variant: SetIconSrcProps['variant']): string | null => {
  return options[type as keyof Options][variant.toString() as keyof IconVariants]
}

const options: Options = { 
  ordinance: {
    dark: ordinanceIconDark,
    light: ordinanceIconLight,
    red: ordinanceIconRed,
    green: null,
    normal: null
  },
  type: {
    dark: typeIconDark,
    light: typeIconLight,
    red: typeIconRed,
    green: null,
    normal: null
  },
  resolution: {
    dark: resolutionIconDark,
    light: resolutionIconLight,
    red: resolutionIconRed,
    green: null,
    normal: null
  },
  firstMilestone: {
    dark: firstMilestoneDark,
    light: firstMilestoneLight,
    red: firstMilestoneRed,
    green: firstMilestoneGreen,
    normal: null
  },
  secondMilestone: {
    dark: secondMilestoneDark,
    light: secondMilestoneLight,
    red: secondMilestoneRed,
    green: secondMilestoneGreen,
    normal: null
  },
  tenYear: {
    dark: tenYearVestingDark,
    light: tenYearVestingLight,
    red: tenYearVestingRed,
    green: null,
    normal: null
  },
  fifteenYear: {
    dark: fifteenYearVestingDark,
    light: fifteenYearVestingLight,
    red: fifteenYearVestingRed,
    green: null,
    normal: null
  },
  expand: {
    dark: expandIconDark,
    light: expandIconLight,
    red: null,
    green: null,
    normal: null
  },
  minimize: {
    dark: minimizeIconDark,
    light: minimizeIconLight,
    red: null,
    green: null,
    normal: null
  },
  sadFace: {
    normal: sadFaceIcon,
    dark: null,
    light: null,
    red: null,
    green: null
  }
}