

window.sections = window.sections || {}
export default () => window.sections

export function addSection(sectionName, section) {
  Object.assign(window.sections, {[sectionName]: section})
}

export function getEnabledSections(key, dest={}) {
  Object.keys(window.sections).forEach( ( section ) => {
    if(!section)
      return

    if(window.sections[section])
      Object.assign(dest, window.sections[section])
  })
  return dest
}