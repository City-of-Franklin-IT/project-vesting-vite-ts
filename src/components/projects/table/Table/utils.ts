import styles from './Table.module.css'

// Types
import { ProjectInterface, ZoningOrdinanceType, MilestoneInterface, VestingPeriodInterface } from "@/context/types"
import { Variants } from "@/components/icons/Icons/types"

export const setMilestoneIconVariant = (milestone: MilestoneInterface | undefined, project: ProjectInterface, hovered: boolean) => {
  if(project.expired) {
    return hovered ? 'light' : 'red'
  }

  const completed = project.VestingPeriods?.every(period => period.VestingStatus?.achieved)

  if(completed) {
    return hovered ? 'light' : 'green'
  }

  if(milestone?.MilestoneStatus?.achieved) {
    return hovered ? 'light' : 'green'
  }

  return hovered ? 'light' : 'dark'
}

export const setVestingIconVariant = (period: VestingPeriodInterface | undefined, project: ProjectInterface, hovered: boolean) => {
  if(project.expired) {
    return hovered ? 'light' : 'red'
  }

  const completed = project.VestingPeriods?.every(period => period.VestingStatus?.achieved)

  if(completed) {
    return hovered ? 'light' : 'green'
  }

  if(period?.VestingStatus?.achieved) {
    return hovered ? 'light' : 'green'
  }

  return hovered ? 'light' : 'dark'
}

export const setIconVariant = (project: ProjectInterface, hovered: boolean): Variants => { // Set icon variant
  if(project.expired) {
    return hovered ? 'light' : 'red'
  }

  let completed = false

  project.VestingPeriods?.forEach(obj => {
    if(obj.VestingStatus?.achieved) {
      completed = true
    }
  })

  if(completed) {
    return hovered ? 'light' : 'green'
  }

  return hovered ? 'light' : 'dark'
}

export const ZoningOrdinanceMap = new Map<ZoningOrdinanceType,string>([
  ['2014-09-29', 'https://www.franklintn.gov/home/showpublisheddocument/31056/637118171429630000'],
  ['2016-02-23', 'https://www.franklintn.gov/home/showpublisheddocument/31054/637118170903330000'],
  ['2017-01-01', 'https://www.franklintn.gov/home/showpublisheddocument/31050/637118169714030000'],
  ['2017-04-01', 'https://www.franklintn.gov/home/showpublisheddocument/31052/637118170362500000'],
  ['2018-03-01', 'https://www.franklintn.gov/home/showpublisheddocument/31048/637118168705330000'],
  ['2018-07-01', 'https://www.franklintn.gov/home/showpublisheddocument/24135/636741747183930000'],
  ['2019-12-30', 'https://web.franklintn.gov/flippingbook/2019franklinzoningordinance/'],
  ['2020-12-08', 'https://web.franklintn.gov/flippingbook/2020FranklinZoningOrdinance'],
  ['2022-01-01', 'https://web.franklintn.gov/flippingbook/2022franklinzoningordinance/'],
  ['2023-01-01', 'https://web.franklintn.gov/FlippingBook/FranklinZoningOrdinance/index.html'],
  ['2024-07-01', 'https://www.franklintn.gov/home/showpublisheddocument/38613']
])

export const ordinanceOptions: { text: ZoningOrdinanceType | '', value: string }[] = [ // Zoning ordinance select options
  { text: '', value: '' },
  { text: '2014-09-29', value: '2014-09-29' },
  { text: '2016-02-23', value: '2016-02-23' },
  { text: '2017-01-01', value: '2017-01-01' },
  { text: '2017-04-01', value: '2017-04-01' },
  { text: '2018-03-01', value: '2018-03-01' },
  { text: '2018-07-01', value: '2018-07-01' },
  { text: '2019-12-30', value: '2019-12-30' },
  { text: '2020-12-08', value: '2020-12-08' },
  { text: '2022-01-01', value: '2022-01-01' },
  { text: '2023-01-01', value: '2023-01-01' },
  { text: '2024-07-01', value: '2024-07-01' }
]

export const handleMilestoneStyle = (milestone: MilestoneInterface | undefined, hovered: boolean): string | undefined => { // Handle milestone date styling
  if(milestone && milestone.MilestoneStatus?.achieved) {
    return hovered ? styles.achievedHover : styles.achieved
  }

  if(milestone && milestone.MilestoneStatus?.expired) {
    return hovered ? styles.expiredHover : styles.expired
  }

  return undefined
}

export const handleVestingStyle = (period: VestingPeriodInterface | undefined, hovered: boolean): string | undefined => {
  if(period && period.VestingStatus?.achieved) {
    return hovered ? styles.achievedHover : styles.achieved
  }

  if(period && period.VestingStatus?.expired) {
    return hovered ? styles.expiredHover : styles.expired
  }

  return undefined
}

export const handleRowStyling = (project: ProjectInterface, index: number): string | undefined => { // Handle table row styling
  if(project.expired) { // Expired
    return styles.expiredRow
  }

  let completed = false

  project.VestingPeriods?.forEach(obj => {
    if(obj.VestingStatus?.achieved) {
      completed = true
    } else completed = false
  })

  if(completed) { // Completed / achieved
    return styles.achievedRow
  }

  if(index % 2 === 0) {
    return styles.evenRow
  } else return styles.oddRow
}