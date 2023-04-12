import { Skill, Trait } from './core'
import dwarfLPJSON from '../data/gold/lifepaths/dwarf.json'

const dwarfLP = dwarfLPJSON

class LeadIcon {
  constructor(name, icon) {
    this.name = name
    this.icon = icon
  }
}

export const LeadsToIcons = {
  "Host": new LeadIcon("Host", "shield-fill"),
  "Outcast": new LeadIcon("Outcast","emoji-frown-fill"),
  "Guilder": new LeadIcon("Guilder","coin"),
  "Artificer":new LeadIcon("Artificer", "gem"),
  "Noble": new LeadIcon("Noble","bank2"),
  "Clansman": new LeadIcon("Clansman","hammer")
}

class LifepathList {
  constructor(rawJSONdata) {
    this.SettingList = {}
    for(let setting in rawJSONdata) {
      let LPList = []
      for(let lptitle in rawJSONdata[setting]) {
        LPList.push(new Lifepath(setting, lptitle))
      }
      this.SettingList[setting] = LPList
    }
  }

  LpInSetting(setting) {
    const filteredList = this.LPList.filter(lp => lp.setting == setting)
    return filteredList
  }

  DisableWhen(predicate) {
    for(let setting in this.SettingList) {
      for(let lpIndex in this.SettingList[setting]) {
        let lifepath = this.SettingList[setting][lpIndex]
        lifepath.disabled = predicate(lifepath)
      }
    }
  }

  SettingNameToIcons = (setting, leadsToIcons) => {
    for(let lead in leadsToIcons) {
      if(setting.indexOf(lead) != -1)  return leadsToIcons[lead].icon
    }
  }
}

export class Lifepath {
  constructor(lifepathSetting, lifepathTitle) {
    const lifePathData = dwarfLP[lifepathSetting][lifepathTitle]
    this.id = lifepathTitle,
    this.time =  lifePathData.time,
    this.res = lifePathData.res,
    this.stat = lifePathData.stat,
    this.generalSkillPts = 0,
    this.skillpts = 0,
    this.common_traits = lifePathData.common_traits,
    this.leads = lifePathData.leads.map(lead => LeadsToIcons[lead]),
    this.requires = lifePathData.requires,
    this.setting = lifepathSetting,
    this.key_leads = lifePathData.key_leads
    this.isBornLP = lifepathTitle.indexOf("Born") != -1 ? true : false
    this.disabled = false

    this.SetupLpSkills(lifePathData.skills)
    this.SetupLpTraits(lifePathData.traits)
  }

  SetupLpTraits(lpTraitData) {
    this.traitPts = lpTraitData[0]
    let traitGroup = []
    for(let j = 1; j < lpTraitData.length; j++) {
      traitGroup.push(new Trait(lpTraitData[j], j == 1))
    }
    this.traits = traitGroup
  }

  SetupLpSkills(lpSkillData) {
    for(let i = 0; i < lpSkillData.length; i++) {
      let skillGroupData = lpSkillData[i]
      // For general Skills
      if(skillGroupData[1] && skillGroupData[1] == "General") {
        this.generalSkillPts = skillGroupData[0]
      }

      // For LP Skill
      else {
        this.generalSkillPts = 0
        this.skillPts = skillGroupData[0]
        let skillGroup = []
        for(let j = 1; j < skillGroupData.length; j++) {
          skillGroup.push(new Skill(skillGroupData[j], j == 1))
        }
        this.skills = skillGroup
      }
    }
  }

  GetStatString() {
    if(!this.stat){
      return "-"
    }
    return this.stat.map((item) => {
      return `+${item[0]} ${item[1]}`  
    }).join(", ")
  }

  GetTraitString() {
    var result = "";
    var traitGroup = this.traits;
    result += traitGroup[0] + " pts: "
    if(traitGroup.length < 2) {
      result += '-'
    }
    else {
      result += traitGroup.slice(1).join(', ')
    }
    return result;
  }

  ResetSkillRequirements() {
    for(let i = 0; i < this.skills; i++) {
      this.skills[i].required = this.skill[i].firstSkill
      this.skills[i].active = true
    }
  }
}

export const DwarfLPList = new LifepathList(dwarfLPJSON, LeadsToIcons)