import { APP_URL as baseUrl } from '../../config'

// Types
import * as Types from './types'

// Get projects
// GET /api/v2/eng/vesting/project
export const getProjects = async (headers: Headers): Promise<Types.ServerResponse & { data: Types.ProjectInterface[] }> => {
  const res = await fetch(`${ baseUrl }/vesting/project`, { headers })

  return await res.json()
}

// Get project
// GET /api/v2/eng/vesting/project/:uuid
export const getProject = async (uuid: string, headers: Headers): Promise<Types.ServerResponse & { data: Types.ProjectInterface }> => {
  const res = await fetch(`${ baseUrl }/vesting/project/${ uuid }`, { headers })

  return await res.json()
}

// Create project
// POST /api/v2/eng/vesting/project
export const createProject = async (formData: Types.ProjectCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.ProjectInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/project`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update project
// PUT /api/v2/eng/vesting/project/:uuid
export const updateProject = async (formData: Types.ProjectCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/project/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete project
// DELETE /api/v2/eng/vesting/project/:uuid
export const deleteProject = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/project/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create project milestone
// POST /api/v2/eng/vesting/milestone
export const createMilestone = async (formData: Types.MilestoneCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/milestone`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update project milestone
// PUT /api/v2/eng/vesting/milestone/:uuid
export const updateMilestone = async (formData: Types.MilestoneCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/milestone/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update project milestone status
// PUT /api/v2/eng/vesting/milestone/status/:uuid
export const updateMilestoneStatus = async (formData: Types.MilestoneStatusUpdateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/milestone/status/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Create project milestone extension
// POST /api/v2/eng/vesting/extension
export const createExtension = async (formData: Types.MilestoneExtensionCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/extension`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update project milestone extension
// PUT /api/v2/eng/vesting/extension/:uuid
export const updateExtension = async (formData: Types.MilestoneExtensionCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/extension/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete project milestone extension
// DELETE /api/v2/eng/vesting/extension/:uuid
export const deleteExtension = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/extension/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create vesting period
// POST /api/v2/eng/vesting/period
export const createPeriod = async (formData: Types.VestingPeriodCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/period`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update vesting period
// PUT /api/v2/eng/vesting/period/:uuid
export const updatePeriod = async (formData: Types.VestingPeriodCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/period/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete vesting period
// DELETE /api/v2/eng/vesting/period/:uuid
export const deletePeriod = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/period/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Update vesting period status
// PUT /api/v2/eng/vesting/period/:uuid
export const updatePeriodStatus = async (formData: Types.VestingStatusUpdateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/period/status/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Create vesting extension
// POST /api/v2/eng/vesting/vesting-extension
export const createVestingExtension = async (formData: Types.VestingExtensionCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/vesting-extension`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update vesting extension
// PUT /api/v2/eng/vesting/vesting-extension/:uuid
export const updateVestingExtension = async (formData: Types.VestingExtensionCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/vesting-extension/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete vesting extension
// DELETE /api/v2/eng/vesting/vesting-extension/:uuid
export const deleteVestingExtension = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/vesting-extension/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create approval
// POST /api/v2/eng/vesting/approval
export const createApproval = async (formData: Types.ApprovalCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.ApprovalInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/approval`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update approval
// PUT /api/v2/eng/vesting/approval/:uuid
export const updateApproval = async (formData: Types.ApprovalCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/approval/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Create resolution
// POST /api/v2/eng/vesting/resolution
export const createResolution = async (formData: Types.ResolutionCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/resolution`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update resolution
// PUT /api/v2/eng/vesting/resolution/:uuid
export const updateResolution = async (formData: Types.ResolutionCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/resolution/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Create project notification
// POST /api/v2/eng/vesting/notification
export const createNotification = async (formData: Types.VestingNotificationCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update project notification
// PUT /api/v2/eng/vesting/notification/:uuid
export const updateNotification = async (formData: Types.VestingNotificationCreateInterface, headers: Headers): Promise<Types.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/vesting/notification/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete project notification
// DELETE /api/v2/eng/vesting/notification/:uuid
export const deleteNotification = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/notification/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}