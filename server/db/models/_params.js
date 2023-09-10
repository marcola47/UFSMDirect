const param =
{
  type: Number,
  default: -10,
  required: true
}

const paramsSchema = 
{
  high_level_coding: param,
  low_level_coding: param,
  backend: param,
  frontend: param,
  databases: param,
  data_structures: param,
  algorithms: param,

  hardware: param,
  software: param,
  infrastructure: param,

  design: param,
  ux_ui: param,
  mobile: param,
  desktop: param,
  web: param,

  tangible_results: param,
  abstract_results: param,

  theory: param,
  practice: param,
  curiosity: param,
  practicality: param,
  creativity: param,
  logic: param,
  intuition: param,
  experimentation: param,
  methodology: param,
  analysis: param,
  adaptability: param,

  leadership: param,
  communication: param,
  team_work: param,
  individual_work: param,

  management: param,
  business: param,
  finance: param,

  math: param,
  physics: param,
  chemistry: param,

  teaching: param,
  mentoring: param,
  masters_degree: param,
  doctorate_degree: param,
  internship: param,
  apprenticeship: param,
  hiring_potential: param
}

export default paramsSchema;