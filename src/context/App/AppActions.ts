import { API_URL as baseUrl } from '../../config'

// Types
import { ServerResponse, GetProjectsResponse, GetProjectResponse, CreateProjectProps, UpdateProjectProps, DeleteProjectsProps, CreateApprovalProps, UpdateApprovalProps, DeleteApprovalProps, CreateResolutionProps, UpdateResolutionProps, CreatePeriodProps, UpdatePeriodProps, UpdatePeriodStatusProps, DeletePeriodProps, CreateMilestoneProps, UpdateMilestoneProps, UpdateMilestoneStatusProps, DeleteMilestoneProps, CreateExtensionProps, UpdateExtensionProps, DeleteExtensionProps, CreateNotificationProps, UpdateNotificationProps, DeleteNotificationProps, CreateProjectResponse } from './types'

// Get projects
// GET /api/v1/eng/vesting/project
export const getProjects = async (): Promise<GetProjectsResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/project`)

  return await res.json()
}

// Get project
// GET /api/v1/eng/vesting/project/:uuid
export const getProject = async (uuid: string): Promise<GetProjectResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/project/${ uuid }`)

  return await res.json()
}

// Create project
// POST /api/v1/eng/vesting/project
export const createProject = async (formData: CreateProjectProps['formData']): Promise<CreateProjectResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update project
// PUT /api/v1/eng/vesting/project/:uuid
export const updateProject = async (formData: UpdateProjectProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/project/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete project
// DELETE /api/v1/eng/vesting/project/:uuid
export const deleteProject = async (uuid: DeleteProjectsProps['uuid']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/project/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Create approval
// POST /api/v1/eng/vesting/approval
export const createApproval = async (formData: CreateApprovalProps['formData']) => {
  const res = await fetch(`${ baseUrl }/vesting/approval`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update approval
// PUT /api/v1/eng/vesting/approval/:uuid
export const updateApproval = async (formData: UpdateApprovalProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/approval/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete approval
// DELETE /api/v1/eng/vesting/approval/:uuid
export const deleteApproval = async (uuid: DeleteApprovalProps['uuid']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/approval/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Create resolution
// POST /api/v1/eng/vesting/resolution
export const createResolution = async (formData: CreateResolutionProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/resolution`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update resolution
// PUT /api/v1/eng/vesting/resolution/:uuid
export const updateResolution = async (formData: UpdateResolutionProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/resolution/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Create vesting period
// POST /api/v1/eng/vesting/period
export const createPeriod = async (formData: CreatePeriodProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/period`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update vesting period
// PUT /api/v1/eng/vesting/period/:uuid
export const updatePeriod = async (formData: UpdatePeriodProps['formData']) => {
  const res = await fetch(`${ baseUrl }/vesting/period/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update vesting period status
// PUT /api/v1/eng/vesting/period/:uuid
export const updatePeriodStatus = async (formData: UpdatePeriodStatusProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/period/status/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete vesting period
// DELETE /api/v1/eng/vesting/period/:uuid
export const deletePeriod = async (uuid: DeletePeriodProps['uuid']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/period/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Create vesting extension
// POST /api/v1/eng/vesting/vesting-extension
export const createVestingExtension = async (formData: CreateExtensionProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/vesting-extension`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update vesting extension
// PUT /api/v1/eng/vesting/vesting-extension/:uuid
export const updateVestingExtension = async (formData: UpdateExtensionProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/vesting-extension/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete vesting extension
// DELETE /api/v1/eng/vesting/vesting-extension/:uuid
export const deleteVestingExtension = async (uuid: DeleteExtensionProps['uuid']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/vesting-extension/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Create project milestone
// POST /api/v1/eng/vesting/milestone
export const createMilestone = async (formData: CreateMilestoneProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/milestone`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update milestone
// PUT /api/v1/eng/vesting/milestone/:uuid
export const updateMilestone = async (formData: UpdateMilestoneProps['formData']) => {
  const res = await fetch(`${ baseUrl }/vesting/milestone/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update project milestone status
// PUT /api/v1/eng/vesting/milestone/status/:uuid
export const updateMilestoneStatus = async (formData: UpdateMilestoneStatusProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/milestone/status/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}


// Delete project milestone
// DELETE /api/v1/eng/vesting/milestone/:uuid
export const deleteMilestone = async (uuid: DeleteMilestoneProps['uuid']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/milestone/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Create project milestone extension
// POST /api/v1/eng/vesting/extension
export const createExtension = async (formData: CreateExtensionProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/extension`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update project milestone extension
// PUT /api/v1/eng/vesting/extension/:uuid
export const updateExtension = async (formData: UpdateExtensionProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/extension/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete project milestone extension
// DELETE /api/v1/eng/vesting/extension/:uuid
export const deleteExtension = async (uuid: DeleteExtensionProps['uuid']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/extension/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Create project notification
// POST /api/v1/eng/vesting/notification
export const createNotification = async (formData: CreateNotificationProps['formData']): Promise<ServerResponse> => {
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
// PUT /api/v1/eng/vesting/notification/:uuid
export const updateNotification = async (formData: UpdateNotificationProps['formData']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/notification/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete project notification
// DELETE /api/v1/eng/vesting/notification/:uuid
export const deleteNotification = async (uuid: DeleteNotificationProps['uuid']): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/vesting/notification/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}