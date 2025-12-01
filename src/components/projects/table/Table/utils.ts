// Types
import * as AppTypes from "@/context/types"
import { Variants, IconTypes, IconSizes } from "@/components/icons/Icons/types"

export const setMilestoneIconVariant = (milestone: AppTypes.MilestoneInterface | undefined, project: AppTypes.ProjectInterface, hovered: boolean) => {
  if(project.expired) {
    return hovered ? 'light' : 'red'
  }

  if(milestone?.MilestoneStatus?.achieved) {
    return hovered ? 'light' : 'green'
  }

  if(milestone?.MilestoneStatus?.expired) {
    return hovered ? 'light' : 'red'
  }

  return hovered ? 'light' : 'dark'
}

export const setVestingIconVariant = (period: AppTypes.VestingPeriodInterface | undefined, project: AppTypes.ProjectInterface, hovered: boolean) => {
  if(project.expired) {
    return hovered ? 'light' : 'red'
  }

  if(period?.VestingStatus?.achieved) {
    return hovered ? 'light' : 'green'
  }

  if(period?.VestingStatus?.expired) {
    return hovered ? 'light' : 'red'
  }

  return hovered ? 'light' : 'dark'
}

export const setIconVariant = (project: AppTypes.ProjectInterface, hovered: boolean): Variants => { // Set icon variant
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

export const ZoningOrdinanceMap = new Map<AppTypes.ZoningOrdinanceType,string>([
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
  ['2024-07-01', 'https://www.franklintn.gov/home/showpublisheddocument/38613'],
  ['2025-01-01', '']
])

export const ordinanceOptions: { text: AppTypes.ZoningOrdinanceType | '', value: string }[] = [ // Zoning ordinance select options
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
  { text: '2024-07-01', value: '2024-07-01' },
  { text: '2025-01-01', value: '2025-01-01' }
]

export const handleRowStyling = (project: AppTypes.ProjectInterface): string | undefined => { // Handle table row styling
  if(project.expired) { // Expired
    return "text-error bg-error-content border-b-2 border-error/20 hover:text-neutral-content hover:bg-error"
  }

  let completed = false

  project.VestingPeriods?.forEach(obj => {
    if(obj.VestingStatus?.achieved) {
      completed = true
    } else completed = false
  })

  if(completed) { // Completed / achieved
    return "text-success bg-[#D9EBE6] border-b-2 border-success-content hover:text-neutral-content hover:bg-success"
  }

  return "bg-neutral-content border-b-2 border-neutral/20 hover:text-neutral-content hover:bg-neutral"
}

export const handleDetailsBtnIcon = ({ expanded, hovered }: { expanded: boolean, hovered: boolean }) => {
  const type: IconTypes = expanded ? 'minimize' : 'expand'
  const variant: Variants = hovered ? 'light' : 'dark'
  const size: IconSizes = 'small'

  return { type, variant, size }
}