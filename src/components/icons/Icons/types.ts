export interface IconsProps { // Icons props
  type: IconTypes,
  variant: Variants
  size: IconSizes
}

export interface Options { // Options object
  ordinance: IconVariants
  type: IconVariants
  resolution: IconVariants
  firstMilestone: IconVariants
  secondMilestone: IconVariants
  tenYear: IconVariants
  fifteenYear: IconVariants
  expand: IconVariants
  minimize: IconVariants
}

export interface IconVariants {
  dark: string | null
  light: string | null
  red: string | null
  green: string | null
  normal: string | null
}

export interface SetIconSrcProps { // setIconSrc fn props
  type: IconTypes,
  variant: Variants
}

export type Variants =
  | 'dark'
  | 'light'
  | 'red'
  | 'green'
  | 'normal'

export type IconTypes =
  | 'ordinance'
  | 'type'
  | 'resolution'
  | 'firstMilestone'
  | 'secondMilestone'
  | 'tenYear'
  | 'fifteenYear'
  | 'expand'
  | 'minimize'
  | 'sadFace'

export type IconSizes =
  | 'small'
  | 'large'
  | 'extraLarge'