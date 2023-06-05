import skillsJSON from 'data/gold/skills.json'
import traitsJSON from 'data/gold/traits.json'
import dwarfJSON from 'data/stock/dwarf.json'
import elfJSON from 'data/stock/elf.json'
import manJSON from 'data/stock/man.json'

import { SkillList, TraitList, ResourceList } from 'js/core'
import { LifepathList, LeadsToIcons } from 'js/lifepath'

class Stock {
  constructor(stockJSON) {
    this.name = stockJSON["Name"]
    this.startingStats = stockJSON["StartingStats"]
    this.lifepathData = stockJSON['Lifepaths']
    this.availableLifepathList = new LifepathList(this.lifepathData, LeadsToIcons)
    this.skillList = new SkillList(skillsJSON, this.name)
    this.traitList = new TraitList(traitsJSON, this.name)
    this.resourceList = new ResourceList(stockJSON["Resources"])
  }
}

export const DwarfStock = new Stock(dwarfJSON)
export const ElfStock = new Stock(elfJSON)
export const ManStock = new Stock(manJSON)
