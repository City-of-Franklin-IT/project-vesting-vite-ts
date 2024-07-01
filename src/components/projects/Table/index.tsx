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

export const setProjectCell = (data: SetProjectCellProps['data'], state: SetProjectCellProps['state'], setState: SetProjectCellProps['setState'], hovered: SetProjectCellProps['hovered'], token: SetProjectCellProps['token']): ReactNode => {
  const handleBtnClick = (): void => { // Handle view more/less button
    if(state.expanded.includes(data.uuid)) {
      setState(prevState => ({ ...prevState, expanded: state.expanded.filter(obj => obj !== data.uuid) }))
    } else setState(prevState => ({ ...prevState, expanded: [ ...state.expanded, data.uuid ] }))
  }

  const setIconVariant = (): Variants => { // Set icon variant
    if(data.expired) {
      return hovered ? 'light' : 'red'
    }

    return hovered ? 'light' : 'dark'
  }

  const name = token ? <Link to={`/update?formType=${ data.type }&uuid=${ data.uuid }`}>{data.name}</Link> : `${ data.name }` // If token present - make link
  
  return (
    <div className={styles.projectCell}>
      <div><span className={token ? styles.nameAsLink : styles.name} title={`Update ${ data.name }`}>{name} // </span><span className={styles.cof}><a href={`https://franklintn.geocivix.com/secure/project/?projTitle=${ data.cof }&searchtype=review&ProjectActive=1&step=results`} target='_blank' title={`Search COF# ${ data.cof } on GeoCivix`}>COF# {data.cof}</a></span>
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

export const setMilestoneCell = (data: SetMilestoneCellProps['data'], hovered: SetMilestoneCellProps['hovered'], navigate: SetMilestoneCellProps['navigate']) => {
  const firstMilestone = data.VestingMilestones.find((obj: Milestone) => obj.number === 1)
  const secondMilestone = data.VestingMilestones.find((obj: Milestone) => obj.number === 2)

  const setIconVariant = (milestone: Milestone | undefined): Variants => { // Set icon variant
    if(milestone && milestone.MilestoneStatus.expired) {
      return hovered ? 'light' : 'red'
    }

    if(milestone && milestone.MilestoneStatus.achieved) { 
      return 'green'
    }

    return hovered ? 'light' : 'dark'
  }

  const handleMilestoneStyle = (milestone: Milestone | undefined): string | undefined => { // Handle milestone date styling
    if(milestone && milestone.MilestoneStatus.achieved) {
      return styles.achieved
    }

    if(milestone && milestone.MilestoneStatus.expired) {
      return hovered ? styles.expiredHover : styles.expired
    }

    return undefined
  }

  return (
    <section onClick={() => navigate(`/update/${ data.uuid }`)} className={styles.centeredFlexRow}>
      <div className={styles.centeredFlexCol}>
        <Icons
          type={'firstMilestone'}
          variant={setIconVariant(firstMilestone)}
          size={'large'} />
        {firstMilestone && firstMilestone.Extension ? (
          <div style={{ position: "relative", display: "flex", gap: "4px", width: "fit-content" }}>
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

export const setVestingCell = (data: SetVestingCellProps['data'], hovered: SetVestingCellProps['hovered'], navigate: SetVestingCellProps['navigate']) => { // Set project vesting cell
  const tenYear = data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y") as VestingPeriod
  const fifteenYear = data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y") as VestingPeriod

  const setIconVariant = (period: VestingPeriod): Variants => { // Set icon variant
    if(period.VestingStatus.expired) {
      return hovered ? 'light' : 'red'
    }

    return hovered ? 'light' : 'dark'
  }

  const handleVestingStyling = (period: VestingPeriod, hovered: boolean) => { // Handle vesting date styling
    if(period.VestingStatus.expired) {
      if(hovered) {
        return styles.expiredHover
      }
  
      return styles.expired
    }
  }

  return (
    <section onClick={() => navigate(`/update/${ data.uuid }`)} className={styles.centeredFlexRow}>
      {tenYear && ( // Ten year vesting period
        <div className={styles.centeredFlexCol}>
          <Icons
            type={'tenYear'}
            variant={setIconVariant(tenYear)} 
            size={'large'} />
          <div className={handleVestingStyling(tenYear, hovered)}>
            {tenYear.date.toString()}
          </div>
        </div>
      )}

      {fifteenYear && ( // Fifteen year vesting period
        <div className={styles.centeredFlexCol}>
          <Icons
            type={'fifteenYear'}
            variant={setIconVariant(fifteenYear)}
            size={'large'} />
          <div className={handleVestingStyling(fifteenYear, hovered)}>
            {fifteenYear.date.toString()}
          </div>
        </div>
      )}
    </section>
  )
}

export const handleRowStyling = (data: HandleRowStylingProps['data'], index: HandleRowStylingProps['index']): string | undefined => { // Handle table row styling
  if(data.expired) {
    return styles.expiredRow
  }

  if(index % 2 === 0) {
    return styles.evenRow
  } else return styles.oddRow
}