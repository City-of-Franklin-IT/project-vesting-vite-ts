import { Link } from 'react-router-dom'
import { zoningOrdinance } from '../../../utils'
import styles from './Table.module.css'

// Components
import DetailsBtn from "../../buttons/DetailsBtn/DetailsBtn"
import Icons from "../../icons/Icons/Icons"

// Types
import { ReactNode } from "react"
import { Milestone, VestingPeriod } from "../../../context/App/types"
import { Variants } from "../../icons/Icons/types"
import { ZoningOrdinanceObj } from '../../../utils/types'
import { SetProjectCellProps, SetMilestoneCellProps, SetVestingCellProps, HandleRowStylingProps } from './types'

export const setProjectCell = (data: SetProjectCellProps['data'], hovered: SetProjectCellProps['hovered'], options: SetProjectCellProps['options']): ReactNode => {
  const { authenticated, state, setState } = options
  
  const handleBtnClick = (): void => { // Handle view more/less button
    if(state.expanded.includes(data.uuid)) {
      setState(prevState => ({ ...prevState, expanded: state.expanded.filter(obj => obj !== data.uuid) }))
    } else setState(prevState => ({ ...prevState, expanded: [ ...state.expanded, data.uuid ] }))
  }

  const setIconVariant = (): Variants => { // Set icon variant
    if(data.expired) {
      return hovered ? 'light' : 'red'
    }

    let completed = false

    data.VestingPeriods.forEach(obj => {
      if(obj.VestingStatus.achieved) {
        completed = true
      }
    })

    if(completed) {
      return hovered ? 'light' : 'green'
    }

    return hovered ? 'light' : 'dark'
  }

  const name = authenticated ? <Link to={`/update?formType=${ data.type }&uuid=${ data.uuid }`}>{data.name}</Link> : `${ data.name }` // If authenticated user - make link
  
  return (
    <div className={styles.projectCell}>
      <div><span className={authenticated ? styles.nameAsLink : styles.name} title={`Update ${ data.name }`}>{name} // </span><span className={styles.cof}><a href={`https://franklintn.geocivix.com/secure/project/?projTitle=${ data.cof }&searchtype=review&ProjectActive=1&step=results`} target='_blank' title={`Search COF# ${ data.cof } on GeoCivix`}>COF# {data.cof}</a></span>
      </div>
      <DetailsBtn
        expanded={state.expanded.includes(data.uuid)}
        hovered={hovered}
        handleClick={() => handleBtnClick()} />
      {state.expanded.includes(data.uuid) && (
        <section className={styles.detailsDiv}>
          <div className="flex justify-between">
            <div className={styles.centeredFlexCol}>
              <Icons
                type={'type'}
                variant={setIconVariant()}
                size={'small'} />
              <small className="underline">Type:</small>
              <small>{data.type}</small>
            </div>

            <div className={styles.centeredFlexCol}>
              <Icons
                type={'ordinance'}
                variant={setIconVariant()}
                size={'small'} />
              <small className="underline">Ordinance:</small>
              <a href={zoningOrdinance[data.ordinance.toString() as keyof ZoningOrdinanceObj]} target="_blank"><small className={styles.ordinance} title={`View ${ data.ordinance } Ordinance`}>{data.ordinance.toString()}</small></a>
            </div>

            {data.Resolution?.resolution && (
              <div className={styles.centeredFlexCol}>
                <Icons
                  type={'resolution'}
                  variant={setIconVariant()}
                  size={'small'} />
                <small className="underline">Resolution:</small>
                <small>{data.Resolution.resolution}</small>
              </div>
            )}
          </div>

          {data.notes && (
            <small className="wrap text-center italic">"{data.notes}"</small>
          )}
        </section>
      )}
    </div>
  )
}

export const setMilestoneCell = (data: SetMilestoneCellProps['data'], hovered: SetMilestoneCellProps['hovered']) => {
  const firstMilestone = data.VestingMilestones.find((obj: Milestone) => obj.number === 1)
  const secondMilestone = data.VestingMilestones.find((obj: Milestone) => obj.number === 2)

  const setIconVariant = (milestone: Milestone | undefined): Variants => { // Set icon variant
    if(milestone && milestone.MilestoneStatus.expired) { // Expired
      return hovered ? 'light' : 'red'
    }

    if(milestone && milestone.MilestoneStatus.achieved) { // Achieved
      return hovered ? 'light' : 'green'
    }

    return hovered ? 'light' : 'dark'
  }

  const handleMilestoneStyle = (milestone: Milestone | undefined): string | undefined => { // Handle milestone date styling
    if(milestone && milestone.MilestoneStatus.achieved) {
      return hovered ? styles.achievedHover : styles.achieved
    }

    if(milestone && milestone.MilestoneStatus.expired) {
      return hovered ? styles.expiredHover : styles.expired
    }

    return undefined
  }

  return (
    <section className={styles.dates}>
      <div className={styles.centeredFlexCol}>
        <Icons
          type={'firstMilestone'}
          variant={setIconVariant(firstMilestone)}
          size={'large'} />
        {firstMilestone && firstMilestone.Extension ? (
          <div className="relative flex gap-1 w-fit">
            <div className={handleMilestoneStyle(firstMilestone)}>{firstMilestone.Extension.date.toString()}<span className={styles.extension}>extended</span></div>
          </div>
        ) : <div className={handleMilestoneStyle(firstMilestone)}>{firstMilestone && firstMilestone.date.toString()}</div>}
      </div>

      <div className={styles.centeredFlexCol}>
        <Icons
          type={'secondMilestone'}
          variant={setIconVariant(secondMilestone)}
          size={'large'} />
        {secondMilestone && secondMilestone.Extension ? (
          <div className="relative flex gap-2 w-fit">
            <div className={handleMilestoneStyle(secondMilestone)}>{secondMilestone.Extension.date.toString()}<span className={styles.extension}>extended</span></div>
          </div>
        ) : <div className={handleMilestoneStyle(secondMilestone)}>{secondMilestone && secondMilestone.date.toString()}</div>}
      </div>
    </section>
  )
}

export const setVestingCell = (data: SetVestingCellProps['data'], hovered: SetVestingCellProps['hovered']) => { // Set project vesting cell
  const tenYear = data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y") as VestingPeriod
  const fifteenYear = data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y") as VestingPeriod

  const setIconVariant = (period: VestingPeriod): Variants => { // Set icon variant  
    if(period && period.VestingStatus.expired) { // Expired
      return hovered ? 'light' : 'red'
    }

    if(period && period.VestingStatus.achieved) { // Achieved
      return hovered ? 'light' : 'green'
    }

    return hovered ? 'light' : 'dark'
  }

  const handleVestingStyle = (period: VestingPeriod): string | undefined => {
    if(period && period.VestingStatus.achieved) {
      return hovered ? styles.achievedHover : styles.achieved
    }

    if(period && period.VestingStatus.expired) {
      return hovered ? styles.expiredHover : styles.expired
    }

    return undefined
  }

  return (
    <section className={styles.dates}>
      {tenYear && ( // Ten year vesting period
        <div className={styles.centeredFlexCol}>
          <Icons
            type={'tenYear'}
            variant={setIconVariant(tenYear)} 
            size={'large'} />
          {tenYear.VestingExtension ? (
            <div className="relative flex gap-1 w-fit">
              <div className={handleVestingStyle(tenYear)}>{tenYear.VestingExtension.date.toString()}<span className={styles.extension}>extended</span></div>
            </div>
          ) : (
            <div className={handleVestingStyle(tenYear)}>
              {tenYear && tenYear.date.toString()}
            </div>
          )}
        </div>
      )}

      {fifteenYear && ( // Fifteen year vesting period
        <div className={styles.centeredFlexCol}>
          <Icons
            type={'fifteenYear'}
            variant={setIconVariant(fifteenYear)} 
            size={'large'} />
          {fifteenYear.VestingExtension ? (
            <div className="relative flex gap-1 w-fit">
              <div className={handleVestingStyle(fifteenYear)}>{fifteenYear.VestingExtension.date.toString()}<span className={styles.extension}>extended</span></div>
            </div>
          ) : (
            <div className={handleVestingStyle(fifteenYear)}>
              {fifteenYear && fifteenYear.date.toString()}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export const handleRowStyling = (data: HandleRowStylingProps['data'], index: HandleRowStylingProps['index']): string | undefined => { // Handle table row styling
  if(data.expired) { // Expired
    return styles.expiredRow
  }

  let completed = false

  data.VestingPeriods.forEach(obj => {
    if(obj.VestingStatus.achieved) {
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