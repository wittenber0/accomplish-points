export interface Client {
  name: string
  context?: string
}

export interface ClientCategory {
  name: string
  clients: Client[]
}

export const clientCategories: ClientCategory[] = [
  {
    name: 'Oregon State University System',
    clients: [
      { name: 'Oregon Wine Research Institute', context: 'Research institute' },
      { name: 'Food Innovation Center', context: 'Research center' },
      {
        name: 'North Willamette Research and Extension Center',
        context: 'Research and extension',
      },
      {
        name: 'Clackamas County Extension and 4-H District',
        context: 'Extension and education',
      },
      { name: 'OSU Extension', context: 'Extension services' },
    ],
  },
  {
    name: 'County Government',
    clients: [
      { name: 'Clackamas County Commission', context: 'County government' },
      { name: 'Clackamas County Planning Division', context: 'County government' },
      {
        name: 'Clackamas County Transportation Engineering Division',
        context: 'County government',
      },
      {
        name: 'Clackamas County Development Agency (Economics and Tourism)',
        context: 'County government',
      },
      { name: 'Clackamas County Parks Department', context: 'County government' },
      {
        name: 'Tillamook County Transportation District',
        context: 'Special district',
      },
    ],
  },
  {
    name: 'Cities',
    clients: [
      {
        name: 'City of Molalla, Oregon',
        context: 'Award-winning Social Services Summit',
      },
      {
        name: 'City of West Linn',
        context: 'Sustainability Task Force appointment',
      },
      {
        name: 'City of Tualatin',
        context: 'Parks Advisory Board appointment',
      },
    ],
  },
  {
    name: 'Special Districts and Libraries',
    clients: [
      {
        name: 'North Clackamas Parks and Recreation District',
        context: 'Annexation proposal and ballot measure',
      },
      { name: 'Clackamas County Library District' },
    ],
  },
]
