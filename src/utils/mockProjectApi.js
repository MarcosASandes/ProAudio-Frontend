// src/services/mock/projectMockApi.js

let nextId = 16

let projects_false = [
  {
    "project_id": 1,
    "name": "Proyecto1",
    "description": "Descripcion P1",
    "start_date": "02/02/2025",
    "end_date": "03/03/2025",
    "event": {
      "name": "Evento1",
      "address": "Direccion evento1",
      "distance": 1,
      "description": "Descripcion evento1",
    },
    "client": "Marcos1",
    "status": "PLANNED",
    "payment_status": "NO_BILL",
    "project_type": "service",
    "cost_addition": 1
  }
]

let mockProjects = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Project ${i + 1}`,
  description: `Description for project ${i + 1}`,
  start_date: `2025-07-${String((i % 28) + 1).padStart(2, "0")} 10:00:00`,
  end_date: `2025-07-${String(((i + 1) % 28) + 1).padStart(2, "0")} 18:00:00`,
  event_id: null,
  event: {
    name: `Event ${i + 1}`,
    address: `${i + 1} Main St.`,
    distance: (i + 1) * 5,
    description: `This is event number ${i + 1}`,
  },
  client: null,
  status: i % 3 === 0 ? "PLANNED" : i % 3 === 1 ? "IN_PROGRESS" : "FINISHED",
  payment_status: i % 2 === 0 ? "NO_BILL" : "PAID",
  project_type: i % 2 === 0 ? "rental" : "service",
  cost_addition: parseFloat((Math.random() * 0.5).toFixed(2)),
  products: [
    {
      product_id: (i % 10) + 1,
      amount: (i % 5) + 1,
    },
  ],
  expenses: [
    {
      type: "PERSONNEL",
      value: 100 + i * 10,
      description: `Expense for project ${i + 1}`,
    },
  ],
}))

const simulateDelay = (data, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay))

export const createProject = async (projectData) => {
  const newProject = {
    ...projectData,
    id: nextId++,
    products: projectData.products || [],
    expenses: projectData.expenses || [],
  }
  mockProjects.push(newProject)
  return simulateDelay({ data: newProject })
}

export const getAllProjects = async ({ page = 1, size = 10 }) => {
  const startIndex = (page - 1) * size
  const paginatedData = mockProjects.slice(startIndex, startIndex + size)

  const totalElements = mockProjects.length
  const totalPages = Math.ceil(totalElements / size)
  const hasNext = page < totalPages
  const hasPrevious = page > 1

  return simulateDelay({
    data: {
      projects: paginatedData,
      pageable: {
        page_number: page,
        page_size: size,
        total_pages: totalPages,
        total_elements: totalElements,
        has_next: hasNext,
        has_previous: hasPrevious,
      },
    },
  })
}


export const getProjectById = async (id) => {
  const project = mockProjects.find((p) => p.id === Number(id))
  if (!project) throw new Error("Proyecto no encontrado")
  return simulateDelay({ data: project })
}

export const updateProject = async (id, updatedData) => {
  const index = mockProjects.findIndex((p) => p.id === Number(id))
  if (index === -1) throw new Error("Proyecto no encontrado")

  mockProjects[index] = {
    ...mockProjects[index],
    ...updatedData,
  }

  return simulateDelay({ data: mockProjects[index] })
}

export const deleteProject = async (id) => {
  const index = mockProjects.findIndex((p) => p.id === Number(id))
  if (index === -1) throw new Error("Proyecto no encontrado")

  const deleted = mockProjects.splice(index, 1)[0]
  return simulateDelay({ data: deleted })
}
