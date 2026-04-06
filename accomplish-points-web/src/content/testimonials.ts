export interface Testimonial {
  quote: string
  name: string
  title?: string
  organization?: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Mary was first rate in her planning skills and especially her ability to be unbending in her focus on a well designed process and product while remaining engaging and flexible with the people involved. She is excellent at eliciting participation and is respectful and collaborative in the way she incorporates the results in the project. She is an excellent writer. She understands how to serve the client\'s needs and as a professional in delivery of public services really understood what was needed. She was a true \'partner\' to the Center and me as her firm\'s name implies.',
    name: 'Clark Seavert',
    title: 'Director',
    organization: 'OSU Research Center',
  },
  {
    quote:
      'Mary is an energetic problem solver and highly ethical and reliable. She can develop and manage a project through all phases and her support has enabled me to achieve greater success in my projects, and the departments and districts under my management.',
    name: 'Dan Zinzer',
    title: 'Director',
    organization: 'Clackamas County Business & Community Services',
  },
  {
    quote:
      'Mary has been an invaluable resource in my professional journey. She has been a trusted advisor whenever I face challenges or decisions related to my career. Her ability to listen, provide thoughtful insights, and offer constructive feedback has been instrumental in my growth. Whether it\'s reviewing materials, assessing situations, or preparing for interviews, her guidance consistently supports both my confidence and success in the workplace.',
    name: 'Connie L.',
  },
  {
    quote:
      'Thank you so much for all your work. You did crack the nut. You got them thinking. You got them off the dime. You did the hard work. You cracked open the doors. You opened the doors for what can happen next. THANK YOU.',
    name: 'Daphne',
  },
]
